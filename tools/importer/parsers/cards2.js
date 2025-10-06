/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from an anchor card
  function extractCardContent(card) {
    // Find image (mandatory)
    let img = card.querySelector('img');
    // Find heading (h3 or h4)
    let heading = card.querySelector('h3, h4');
    // Find description (first <p>)
    let desc = card.querySelector('p');
    // Find CTA (button or link or .button)
    let cta = card.querySelector('.button, button, a.button');
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    // Always include at least heading and description
    return [img, textCell];
  }

  // Find all card containers
  // The first card is a direct child <a>, the rest are inside a nested grid
  const cards = [];
  // Find the main grid
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // First card: direct child <a>
  const firstCard = mainGrid.querySelector(':scope > a.utility-link-content-block');
  if (firstCard) {
    cards.push(firstCard);
  }

  // Nested grid containing other cards
  const nestedGrid = mainGrid.querySelector(':scope > .w-layout-grid.grid-layout');
  if (nestedGrid) {
    nestedGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(card => {
      cards.push(card);
    });
  }

  // Defensive: If cards are not found, return
  if (!cards.length) return;

  // Build table rows
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];
  cards.forEach(card => {
    rows.push(extractCardContent(card));
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block header
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Find the main grid container holding all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Helper to extract card content
  function extractCard(card) {
    // Find image (first img inside card)
    const img = card.querySelector('img.cover-image');
    // Find heading (h2, h3, h4)
    const heading = card.querySelector('h2, h3, h4');
    // Find description (first p)
    const description = card.querySelector('p');
    // Find CTA (button or .button class)
    const cta = card.querySelector('.button');

    // Compose text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (description) textCell.appendChild(description);
    if (cta) textCell.appendChild(cta);

    return [img, textCell];
  }

  // The first card is the feature card (left)
  const mainCard = grid.querySelector('a.utility-link-content-block');
  if (mainCard) {
    rows.push(extractCard(mainCard));
  }

  // The right column: nested grid of cards
  const nestedGrid = grid.querySelector('.w-layout-grid.grid-layout');
  if (nestedGrid) {
    const nestedCards = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
    nestedCards.forEach(card => {
      rows.push(extractCard(card));
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

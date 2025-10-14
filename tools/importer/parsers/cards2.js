/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card anchor or div
  function extractCard(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find heading (h2, h3, h4)
    const heading = cardEl.querySelector('h2, h3, h4');
    // Find description (first <p> after heading)
    let description = null;
    if (heading) {
      description = heading.nextElementSibling && heading.nextElementSibling.tagName === 'P'
        ? heading.nextElementSibling
        : cardEl.querySelector('p');
    } else {
      description = cardEl.querySelector('p');
    }
    // Find CTA (button or link)
    let cta = cardEl.querySelector('.button, button, a:not([href="#"])');
    // If no CTA, check for .button class
    if (!cta) {
      cta = cardEl.querySelector('.button');
    }
    // Compose text cell
    const textParts = [];
    if (heading) textParts.push(heading);
    if (description) textParts.push(description);
    if (cta) textParts.push(cta);
    return [img, textParts];
  }

  // Find the main grid container (holds all cards)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate card anchors/divs in the grid
  // The first child is the hero card (anchor), the second child is a nested grid containing the rest
  const gridChildren = Array.from(grid.children);
  const cards = [];

  // First card (hero)
  const firstCard = gridChildren[0];
  if (firstCard && (firstCard.tagName === 'A' || firstCard.classList.contains('utility-link-content-block'))) {
    cards.push(extractCard(firstCard));
  }

  // Remaining cards are inside the nested grid
  const nestedGrid = gridChildren[1];
  if (nestedGrid && nestedGrid.classList.contains('w-layout-grid')) {
    // Each card is an anchor inside this grid
    const nestedCards = Array.from(nestedGrid.children).filter(
      el => el.tagName === 'A' || el.classList.contains('utility-link-content-block')
    );
    nestedCards.forEach(cardEl => {
      cards.push(extractCard(cardEl));
    });
  }

  // Table header
  const headerRow = ['Cards (cards2)'];
  // Compose table rows
  const tableRows = [headerRow, ...cards];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace element
  element.replaceWith(block);
}

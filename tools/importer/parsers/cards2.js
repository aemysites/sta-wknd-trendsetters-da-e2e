/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card anchor or div
  function extractCard(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find heading (h2, h3, h4)
    const heading = cardEl.querySelector('h2, h3, h4');
    // Find description (first <p> after heading)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or link)
    let cta = cardEl.querySelector('.button, button, a.button');
    // Compose text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);
    return [img, textCell];
  }

  // Find the main grid container holding cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children that are cards (anchors)
  const cardNodes = [];
  // The first child is an anchor (the big card)
  const firstCard = grid.querySelector('a.utility-link-content-block');
  if (firstCard) cardNodes.push(firstCard);

  // The second child is a nested grid with four anchors (the small cards)
  const nestedGrid = grid.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (nestedGrid) {
    nestedGrid.querySelectorAll('a.utility-link-content-block').forEach(card => {
      cardNodes.push(card);
    });
  }

  // Defensive: If not found, fallback to all anchors in grid
  if (cardNodes.length === 0) {
    grid.querySelectorAll('a.utility-link-content-block').forEach(card => {
      cardNodes.push(card);
    });
  }

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);
  // Card rows
  cardNodes.forEach(cardEl => {
    rows.push(extractCard(cardEl));
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

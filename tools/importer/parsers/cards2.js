/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract card info from a card anchor or div
  function extractCard(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find heading (h2/h3/h4)
    const heading = cardEl.querySelector('h2, h3, h4');
    // Find paragraph(s)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or link)
    let cta = cardEl.querySelector('.button, button, a.button');
    // Compose text cell
    const textParts = [];
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    if (cta) textParts.push(cta);
    return [img, textParts];
  }

  // Find the main grid containing all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // First card is a large feature card (left column)
  const firstCard = grid.querySelector('a.utility-link-content-block');
  // The rest are inside the nested grid
  const nestedGrid = grid.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  const cardEls = [];
  if (firstCard) cardEls.push(firstCard);
  if (nestedGrid) {
    nestedGrid.querySelectorAll('a.utility-link-content-block').forEach(card => cardEls.push(card));
  }

  // Defensive: If not found, try fallback for direct children
  if (cardEls.length === 0) {
    grid.querySelectorAll('a.utility-link-content-block').forEach(card => cardEls.push(card));
  }

  // Table header
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Each card becomes a row: [image, text]
  cardEls.forEach(cardEl => {
    const [img, textParts] = extractCard(cardEl);
    rows.push([img, textParts]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

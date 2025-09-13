/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card container
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // Try fallback: look for .card then .card-body
    const card = element.querySelector('.card');
    cardBody = card ? card.querySelector('.card-body') : null;
  }
  if (!cardBody) return;

  // Extract image (mandatory)
  const img = cardBody.querySelector('img');

  // Extract heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose text cell
  const textCell = [];
  if (heading) textCell.push(heading);
  // No additional description found in this HTML, but keep structure for future variants

  // Compose table rows
  const headerRow = ['Cards (cards21)'];
  const cardRow = [img, textCell];
  const cells = [headerRow, cardRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card content block
  const cardWrapper = element.querySelector(':scope > div > div.card > div.card-body');
  if (!cardWrapper) return;

  // Extract image (mandatory, first cell)
  const img = cardWrapper.querySelector('img');

  // Extract heading (optional, second cell)
  const heading = cardWrapper.querySelector('.h4-heading');

  // Compose the text cell
  const textCell = [];
  if (heading) textCell.push(heading);
  // No description or CTA present in this HTML, so only heading

  // Compose the table rows
  const headerRow = ['Cards (cards21)'];
  const cardRow = [img, textCell];
  const cells = [headerRow, cardRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

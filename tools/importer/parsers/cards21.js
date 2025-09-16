/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the card body (contains heading and image)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory, goes in first cell)
  const img = cardBody.querySelector('img');

  // Find the heading (optional, goes in second cell)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose text cell: heading then any description (none in this case)
  const textCell = [];
  if (heading) textCell.push(heading);
  // No description or CTA present in this HTML

  // Table header row
  const headerRow = ['Cards (cards21)'];

  // Table card row: [image, text content]
  const cardRow = [img, textCell];

  const cells = [headerRow, cardRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

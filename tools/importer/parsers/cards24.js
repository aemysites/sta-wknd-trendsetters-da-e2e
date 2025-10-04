/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per spec
  const headerRow = ['Cards (cards24)'];

  // Defensive: find the card body
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract image (reference the element, do not clone)
  const img = cardBody.querySelector('img');

  // Extract heading (reference the element, do not clone)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell: heading only (no description or CTA in source)
  const textCell = [];
  if (heading) textCell.push(heading);

  // Build table rows
  const rows = [
    headerRow,
    [img, textCell]
  ];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

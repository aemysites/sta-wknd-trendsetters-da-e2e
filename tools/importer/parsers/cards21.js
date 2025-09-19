/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost card-body
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract the image (reference the existing element)
  const img = cardBody.querySelector('img');
  // Extract the heading (reference the existing element)
  const heading = cardBody.querySelector('.h4-heading');

  // Defensive: Only add row if both image and heading exist
  if (!img || !heading) return;

  // Prepare the text cell (preserve heading semantics)
  const textCell = document.createElement('div');
  textCell.appendChild(heading);
  // No description or CTA in this HTML, so only title

  // Build table rows
  const headerRow = ['Cards (cards21)'];
  const rows = [[img, textCell]];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element
  element.replaceWith(table);
}

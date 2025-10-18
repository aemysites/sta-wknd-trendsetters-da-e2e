/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns: image and text content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: image
  const imageEl = columns.find((el) => el.tagName === 'IMG');
  // Right column: text content (should be a div)
  const textCol = columns.find((el) => el.tagName !== 'IMG');

  // Defensive: if either column is missing, abort
  if (!imageEl || !textCol) return;

  // Table header row
  const headerRow = ['Columns (columns33)'];

  // Table content row: [image, text content]
  const contentRow = [imageEl, textCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

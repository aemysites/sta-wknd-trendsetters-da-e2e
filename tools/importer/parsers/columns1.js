/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image + content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns[0];
  // Second column: text content
  const contentCol = columns[1];

  // Table header row
  const headerRow = ['Columns (columns1)'];
  // Table columns row
  const columnsRow = [imageCol, contentCol];

  // Build table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

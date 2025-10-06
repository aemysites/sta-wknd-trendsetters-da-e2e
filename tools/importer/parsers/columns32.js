/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid (should be 2 columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: all content in the first grid cell
  const firstCol = columns[0];
  // Second column: all content in the second grid cell
  const secondCol = columns[1];

  // Table header
  const headerRow = ['Columns block (columns32)'];
  // Table content row: each column as a cell
  const contentRow = [firstCol, secondCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}

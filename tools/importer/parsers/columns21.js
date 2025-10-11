/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be 4 columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Build the header row
  const headerRow = ['Columns (columns21)'];

  // Build the columns row: each cell is the content of a column
  const columnsRow = columns.map(col => col);

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

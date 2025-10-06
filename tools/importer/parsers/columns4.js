/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each is a column)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header row
  const headerRow = ['Columns (columns4)'];

  // Second row: each cell is a column's content
  // Use the entire column element as the cell content
  const columnsRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: if no columns, do nothing
  if (columns.length === 0) return;

  // Build the header row
  const headerRow = ['Columns (columns38)'];

  // Build the columns row: each cell is a column's content
  // If the column is a link or a block-level element, just use it directly
  // If the column contains multiple elements, wrap them in a fragment
  const columnsRow = columns.map((col) => col);

  // Build the table data
  const tableData = [headerRow, columnsRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

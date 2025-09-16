/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the header row
  const headerRow = ['Columns block (columns30)'];

  // Build the columns row: each cell is the full content of the corresponding column
  // Reference the actual elements, not their HTML strings
  const columnsRow = columns.map(col => col);

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

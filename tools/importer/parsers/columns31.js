/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Prepare the header row as required
  const headerRow = ['Columns (columns31)'];

  // Prepare the columns row: each cell is the content of one column
  // Reference the entire column element for resilience
  const columnsRow = columns.map(col => col);

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

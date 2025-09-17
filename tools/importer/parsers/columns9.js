/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout containing columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns block (columns9)'];

  // Build the columns row: each cell is a column's content
  // Reference the entire column element for resilience
  const columnsRow = columns.map(col => col);

  // Compose the table data
  const cells = [headerRow, columnsRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

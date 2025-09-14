/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the header row as required
  const headerRow = ['Columns (columns30)'];

  // Build the content row: each cell is a column's content
  // Use the original elements directly for resilience
  const contentRow = columns.map(col => col);

  // Compose the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original section with the new block table
  element.replaceWith(block);
}

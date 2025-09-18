/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row as required
  const headerRow = ['Columns block (columns9)'];

  // Second row: each cell is a column's entire content
  const contentRow = columns;

  // Compose the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

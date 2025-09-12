/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 1) return;

  // Build the header row using the exact block name
  const headerRow = ['Columns block (columns35)'];

  // Each cell should reference the actual DOM node for that column
  const columnsRow = columns.map(col => col);

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

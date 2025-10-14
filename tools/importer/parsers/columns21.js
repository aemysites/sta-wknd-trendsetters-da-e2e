/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if we have at least one column
  if (!columns.length) return;

  // Build the header row for the block
  const headerRow = ['Columns (columns21)'];

  // Build the columns row: each cell is the content of one column
  // We want to preserve the original elements, not clone or create new
  const columnsRow = columns.map((col) => col);

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all top-level columns (direct children of the grid)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the table rows
  const headerRow = ['Columns block (columns21)'];
  // The second row: one cell per column, each cell contains the entire column content
  const contentRow = columns.map((col) => col);

  // Table structure: header, then one row of columns
  const tableRows = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

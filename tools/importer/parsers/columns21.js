/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Prepare the header row
  const headerRow = ['Columns (columns21)'];

  // Prepare the columns row: each cell is one column's content
  const columnsRow = columns.map((col) => col);

  // Table structure: header row, then columns row
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

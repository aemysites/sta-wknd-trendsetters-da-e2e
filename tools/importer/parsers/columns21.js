/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare header row
  const headerRow = ['Columns block (columns21)'];

  // Prepare columns row: each cell is the content of one column
  // Each column is a div or ul (for nav columns)
  // Reference the entire column element for resilience
  const columnsRow = columns.map((col) => col);

  // Table rows: header + columns
  const rows = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

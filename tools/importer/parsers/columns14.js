/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (should be columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns block (columns14)'];

  // Build the columns row
  // Each cell contains the full content of each column
  const columnsRow = columns.map((col) => col);

  // Compose the table data
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

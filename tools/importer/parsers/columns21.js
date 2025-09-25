/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);

  // Table header row
  const headerRow = ['Columns (columns21)'];

  // Second row: each column cell contains the full content of that column
  const secondRow = columns.map((col) => col);

  // Only one content row is needed for this block (as per screenshots and HTML)
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

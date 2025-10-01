/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (holds columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of grid (each is a column)
  const columns = Array.from(grid.children);

  // Prepare the header row
  const headerRow = ['Columns block (columns21)'];

  // Each column's content as a cell (reference, do not clone)
  const secondRow = columns.map((col) => col);

  // Compose the table
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container holding all columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns block (columns9)'];

  // Second row: each cell is the content of a column
  // We reference the entire column element for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

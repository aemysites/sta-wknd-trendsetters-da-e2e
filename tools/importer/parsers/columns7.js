/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Table header row
  const headerRow = ['Columns block (columns7)'];

  // Table body row: each column's content as a cell
  // For each column, include the entire element as a cell
  const bodyRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, bodyRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

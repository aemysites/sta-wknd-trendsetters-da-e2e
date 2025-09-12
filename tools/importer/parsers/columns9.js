/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns block (columns9)'];

  // Table content row: each column's content as a cell
  // For each column, we want to reference the whole column element
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

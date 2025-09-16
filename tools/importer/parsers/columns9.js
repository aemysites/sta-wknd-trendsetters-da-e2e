/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Defensive: Only keep columns that have content
  const validColumns = columns.filter(col => col && col.childNodes.length > 0);

  // Header row as required
  const headerRow = ['Columns block (columns9)'];

  // Second row: each cell is a column's content
  // For resilience, reference the whole column element in each cell
  const contentRow = validColumns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

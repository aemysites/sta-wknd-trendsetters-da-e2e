/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the grid container (holds columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Header row as required
  const headerRow = ['Columns block (columns9)'];

  // Second row: each column's content
  // Each column is a div or ul (the first is logo + social, rest are ul lists)
  const secondRow = columns.map((col) => col);

  // Table: header + columns as a single row
  const tableCells = [headerRow, secondRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element
  element.replaceWith(block);
}

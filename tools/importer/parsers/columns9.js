/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container with columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header row as per requirements
  const headerRow = ['Columns block (columns9)'];

  // Second row: each cell is a column's entire content
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

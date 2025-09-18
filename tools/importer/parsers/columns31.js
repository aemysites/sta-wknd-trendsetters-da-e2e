/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (should be direct child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns (columns31)'];

  // Second row: each column's content in a cell
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

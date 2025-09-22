/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container, which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If there are no columns, do nothing
  if (!columns.length) return;

  // Table header row: block name only
  const headerRow = ['Columns (columns31)'];

  // Table content row: each column's content as a cell
  // We reference the existing elements directly for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row as per requirements
  const headerRow = ['Columns (columns3)'];

  // Second row: each cell is a column's content
  // For each column, include the entire column element (preserving structure)
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // First column: text content and button
  const firstCol = columns.find((col) => col.querySelector('h2'));
  // Second column: image
  const secondCol = columns.find((col) => col.tagName === 'IMG');

  // Defensive: ensure both columns exist
  if (!firstCol || !secondCol) return;

  // Header row
  const headerRow = ['Columns (columns28)'];

  // Second row: two columns, left is all text/button, right is image
  const cellsRow = [firstCol, secondCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}

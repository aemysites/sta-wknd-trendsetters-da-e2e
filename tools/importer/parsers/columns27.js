/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: content div and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: content block (text, heading, button)
  const contentCol = columns[0];
  // Second column: image
  const imageCol = columns[1];

  // Table header must match block name exactly
  const headerRow = ['Columns (columns27)'];

  // Second row: reference the actual DOM nodes (do not clone)
  const row = [contentCol, imageCol];

  // Build table
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}

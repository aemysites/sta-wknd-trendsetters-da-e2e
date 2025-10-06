/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two: content and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: content (text, button, etc.)
  const contentCol = columns[0];
  // Second column: image
  const imageCol = columns[1];

  // Build the table rows
  const headerRow = ['Columns (columns28)'];
  const columnsRow = [contentCol, imageCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

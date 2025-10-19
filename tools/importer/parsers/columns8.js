/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns block (columns8)'];

  // Defensive: Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (should be: heading, then right column)
  const gridChildren = Array.from(grid.children);

  // First column: heading (likely h2)
  const leftCol = gridChildren[0];

  // Second column: content (paragraph + button)
  const rightCol = gridChildren[1];

  // Build the columns row: one cell per column
  const columnsRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

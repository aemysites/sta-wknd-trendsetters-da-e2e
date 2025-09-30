/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: need at least 2 columns

  // Header row: must match block name exactly
  const headerRow = ['Columns block (columns8)'];

  // Second row: use the actual elements as table cells
  const contentRow = columns;

  // Build the table using the required API
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

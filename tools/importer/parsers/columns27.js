/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if there are at least two columns
  if (columns.length < 2) return;

  // Table header row: must match block name exactly
  const headerRow = ['Columns (columns27)'];

  // Second row: each column's content as a cell (reference the DOM nodes directly)
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

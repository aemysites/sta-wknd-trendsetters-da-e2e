/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds all columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of grid is a column
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row must match block name exactly
  const headerRow = ['Columns (columns21)'];

  // Second row: each cell contains the referenced column element
  // This preserves all text, images, links, lists, and semantic structure
  const contentRow = columns.map(col => col);

  // Create the table with header and content row
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

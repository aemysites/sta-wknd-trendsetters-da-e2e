/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Find the grid layout containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children (image and content columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image element (reference, not clone)
  const imageCol = columns[0];
  // Second column: content (reference, not clone)
  const contentCol = columns[1];

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns1)'];
  // Table row: each column as a cell
  const row = [imageCol, contentCol];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}

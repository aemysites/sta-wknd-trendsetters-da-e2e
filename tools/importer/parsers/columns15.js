/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get only direct children columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row must match target block name exactly
  const headerRow = ['Columns (columns15)'];

  // Second row: each cell is the actual DOM node from the column (not cloning)
  const secondRow = columns.map(col => col);

  // Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element
  element.replaceWith(table);
}

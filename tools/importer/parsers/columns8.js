/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the actual columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Header row as specified
  const headerRow = ['Columns (columns8)'];

  // Second row: each column's content (reference the actual DOM nodes)
  const secondRow = columns.map((col) => col);

  // Compose the table
  const cells = [
    headerRow,
    secondRow,
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

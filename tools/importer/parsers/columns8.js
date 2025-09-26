/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // The first child is the heading (left column)
  const heading = gridChildren[0];

  // The second child is the right column content (text + button)
  const rightCol = gridChildren[1];

  // Compose the columns row
  const columnsRow = [heading, rightCol];

  // Table header
  const headerRow = ['Columns block (columns8)'];

  // Compose table rows
  const rows = [headerRow, columnsRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

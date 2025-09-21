/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const children = Array.from(grid.children);

  // Only proceed if there are exactly two children (left and right columns)
  if (children.length !== 2) return;

  // Left column: heading
  const leftCell = [children[0]];

  // Right column: extract all children of rightCol as direct cell content
  const rightColChildren = Array.from(children[1].children);
  const rightCell = rightColChildren.length ? rightColChildren : [children[1]];

  // Table header row: must be a single column
  const headerRow = ['Columns (columns8)'];
  // Second row: two columns
  const secondRow = [leftCell, rightCell];

  // Build table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

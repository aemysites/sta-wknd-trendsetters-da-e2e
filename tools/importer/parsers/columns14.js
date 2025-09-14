/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row: must be a single column with block name
  const headerRow = ['Columns (columns14)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the left column (h2) and right column (div)
  const leftCol = gridChildren.find(child => child.tagName === 'H2');
  const rightCol = gridChildren.find(child => child !== leftCol);
  if (!leftCol || !rightCol) return;

  // Second row: left is the heading, right is all content in rightCol
  const secondRow = [leftCol, rightCol];

  // Build the table: header row must be a single cell only
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the block
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Columns: left (heading), right (paragraph + button)
  let leftCol = null;
  let rightCol = null;

  // Find the heading (left column)
  leftCol = gridChildren.find((el) => el.tagName === 'H2');

  // Find the right column (container div with paragraph and button)
  rightCol = gridChildren.find((el) => el.tagName === 'DIV');

  // Defensive: if missing columns, fallback to entire grid
  if (!leftCol || !rightCol) {
    leftCol = grid;
    rightCol = '';
  }

  // Table header row
  const headerRow = ['Columns (columns8)'];

  // Table content row: two columns side by side
  const contentRow = [leftCol, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}

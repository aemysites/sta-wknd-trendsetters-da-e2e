/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns in grid
  // Left: heading (h2)
  // Right: div with paragraph and button
  let leftCol = null;
  let rightCol = null;

  // Find heading (left column)
  leftCol = gridChildren.find((el) => el.tagName === 'H2');

  // Find right column (div with paragraph and button)
  rightCol = gridChildren.find((el) => el.tagName === 'DIV');

  // If either column is missing, abort
  if (!leftCol || !rightCol) return;

  // Do not clone, use references to preserve semantic meaning and formatting

  // Table construction
  const headerRow = ['Columns block (columns8)']; // CRITICAL: block name as header
  const contentRow = [leftCol, rightCol]; // Each column as a cell

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

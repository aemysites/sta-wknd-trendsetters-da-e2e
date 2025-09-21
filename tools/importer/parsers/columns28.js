/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main children of the grid: left content and right image
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: content block (reference, not clone)
  const leftCol = gridChildren[0];
  // Right column: image block (reference, not clone)
  const rightCol = gridChildren[1];

  // Build the table header row exactly as required
  const headerRow = ['Columns (columns28)'];

  // Build the table content row, referencing existing elements
  const contentRow = [leftCol, rightCol];

  // Create the table with the correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

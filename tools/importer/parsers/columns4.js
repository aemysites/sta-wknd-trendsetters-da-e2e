/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns4)'];

  // Defensive: find the grid layout container
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid (these are the columns)
    const gridChildren = Array.from(grid.children);
    // For this source, there are two main columns:
    // 1. The left column with heading and paragraph
    // 2. The right column with two buttons
    if (gridChildren.length === 2) {
      const leftCol = gridChildren[0];
      const rightCol = gridChildren[1];
      columns = [leftCol, rightCol];
    } else {
      // Fallback: treat all children as columns
      columns = gridChildren;
    }
  } else {
    // Fallback: treat all direct children of element as columns
    columns = Array.from(element.children);
  }

  // Second row: each column as a cell
  const secondRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

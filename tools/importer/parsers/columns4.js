/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns4)'];

  // Defensive: get the grid container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid (these are the columns)
    const gridChildren = Array.from(grid.children);
    // There should be two columns: left (heading + desc), right (buttons)
    if (gridChildren.length >= 2) {
      // Left column: heading + subheading
      const leftCol = gridChildren[0];
      // Right column: button group
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

  // Second row: each column's content as a cell
  const contentRow = columns;

  // Build table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

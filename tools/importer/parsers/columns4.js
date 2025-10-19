/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container, which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct child columns of the grid
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: heading + paragraph
  const leftCol = columns[0];
  // Right column: button group
  const rightCol = columns[1];

  // Table header row must match block name exactly
  const headerRow = ['Columns (columns4)'];

  // Table content row: reference the actual DOM nodes
  const contentRow = [leftCol, rightCol];

  // Build the table using referenced elements
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

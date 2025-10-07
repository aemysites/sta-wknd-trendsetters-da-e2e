/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Table header must match block name exactly
  const headerRow = ['Columns (columns4)'];

  // Table row: reference the actual DOM nodes for each column
  const row = [leftCol, rightCol];

  // Create the table using DOMUtils, referencing the original elements
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  // Replace the section with the columns table
  element.replaceWith(table);
}

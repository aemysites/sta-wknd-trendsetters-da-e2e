/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns4)'];

  // Defensive: Find the grid layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns based on screenshot and HTML
  // Left column: heading + subheading
  // Right column: button group (two buttons)
  const leftCol = columns[0];
  const rightCol = columns[1];

  // For left column, grab all its children (heading and paragraph)
  const leftContent = Array.from(leftCol.children);

  // For right column, grab all its children (the buttons)
  const rightContent = Array.from(rightCol.children);

  // Build the columns row: each cell is an array of elements
  const columnsRow = [
    leftContent, // left cell: heading + subheading
    rightContent // right cell: buttons
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

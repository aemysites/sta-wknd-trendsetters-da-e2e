/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // For this block, we want two columns: left (text/meta/social), right (image)
  // The first child is the left column, the second is the right column
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Defensive: if rightCol is missing, create an empty cell

  // Header row
  const headerRow = ['Columns (columns32)'];

  // Second row: two columns
  const contentRow = [
    leftCol || '',
    rightCol || '',
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

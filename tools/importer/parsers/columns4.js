/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Prepare the header row for the Columns block
  const headerRow = ['Columns (columns4)'];

  // Defensive: left is the first child, right is the second child
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Compose the content row with the two columns
  // Reference the actual DOM nodes, not clones or new elements
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The first column: heading and subheading
  const leftCol = columns[0];
  // The second column: button group
  const rightCol = columns[1];

  // Build the table rows
  const headerRow = ['Columns block (columns4)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

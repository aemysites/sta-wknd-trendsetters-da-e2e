/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns
  // Left: heading + paragraph
  // Right: button group
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Prepare the table rows
  const headerRow = ['Columns block (columns4)'];
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

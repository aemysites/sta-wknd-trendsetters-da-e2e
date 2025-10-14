/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns (left: text, right: buttons)
  // But handle more/fewer gracefully
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Prepare the table rows
  const headerRow = ['Columns block (columns4)'];

  // Second row: as many columns as in the grid
  const contentRow = [];
  if (leftCol) contentRow.push(leftCol);
  if (rightCol) contentRow.push(rightCol);
  // If more columns exist, add them
  for (let i = 2; i < columns.length; i += 1) {
    contentRow.push(columns[i]);
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

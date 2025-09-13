/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (multi-column)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: ensure there are at least two columns
  if (columns.length < 2) return;

  // First column: heading + subheading
  const firstCol = columns[0];
  // Second column: button
  const secondCol = columns[1];

  // Build the header row
  const headerRow = ['Columns (columns35)'];

  // Build the columns row
  // Each cell should reference the entire column content
  // Defensive: if the column is an <a>, reference it directly
  const colCells = [firstCol, secondCol];

  // Build the table
  const cells = [headerRow, colCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

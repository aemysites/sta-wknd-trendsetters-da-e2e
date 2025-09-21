/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Step 2: Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Step 3: Prepare header row as specified
  const headerRow = ['Columns (columns21)'];

  // Step 4: Prepare the second row: Each column's content as a table cell
  // Each cell must reference the original column element, not clone it
  const secondRow = columns.map(col => col);

  // Step 5: Build the table: header row, then one row with all columns side by side
  const tableCells = [headerRow, secondRow];

  // Step 6: Create the table block
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Step 7: Replace the original element
  element.replaceWith(block);
}

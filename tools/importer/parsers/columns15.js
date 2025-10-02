/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: find the grid container (should be the first child of the container)
  const grid = element.querySelector(':scope > .grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid (these are the columns)
    const colEls = Array.from(grid.children);
    // Each child is a column cell
    columns = colEls.map((col) => col);
  } else {
    // Fallback: treat all direct children as columns
    columns = Array.from(element.children);
  }

  // Only add the row if there is at least one column
  const rows = [headerRow];
  if (columns.length) {
    rows.push(columns);
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

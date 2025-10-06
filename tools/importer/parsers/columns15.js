/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: Find the grid-layout container (holds the columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all direct children of the grid (each is a column)
    const colEls = Array.from(grid.querySelectorAll(':scope > div'));
    // Each column cell: use the entire content of the child div
    columns = colEls.map((col) => {
      // If the column only has one child, use that child directly
      if (col.children.length === 1) {
        return col.firstElementChild;
      }
      // Otherwise, use the whole column div
      return col;
    });
  } else {
    // Fallback: If grid-layout not found, put all children in one cell
    columns = [element];
  }

  // Build the table: header row, then content row with columns
  const tableCells = [headerRow, columns];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

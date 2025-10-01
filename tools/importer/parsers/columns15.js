/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: find the grid-layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  // If not found, fallback to all direct children
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);

  // The screenshot shows three columns: two text, one button
  // Each column is a div, each with one child (either <p> or <a>)
  const contentRow = columns.map((col) => {
    // If column has only one child, use it directly
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, use the column itself (shouldn't happen in this HTML)
    return col;
  });

  // Build the table
  const tableCells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}

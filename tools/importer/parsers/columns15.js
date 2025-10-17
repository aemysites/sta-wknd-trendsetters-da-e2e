/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Find the grid layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  const columns = grid ? Array.from(grid.children) : [];

  // Defensive: If columns are missing, do nothing
  if (!columns.length) return;

  // Prepare the second row: one cell per column, referencing existing elements
  const contentRow = columns.map((col) => {
    // If the column contains only one child, use that child directly
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, collect all children as an array
    return Array.from(col.children);
  });

  // Compose the table structure
  const tableCells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

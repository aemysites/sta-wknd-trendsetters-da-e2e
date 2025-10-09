/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  // Defensive: Get all immediate children of the grid (each column)
  const columns = grid ? Array.from(grid.children) : [];

  // For this block, each column is a cell in the second row
  // We'll reference the entire column's content (paragraph or button)
  const row = columns.map(col => {
    // If the column contains only one child, use it directly
    if (col.children.length === 1) {
      return col.children[0];
    }
    // Otherwise, reference the column itself
    return col;
  });

  // Compose the table rows
  const cells = [headerRow, row];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Defensive: Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid (each column)
    const colEls = Array.from(grid.children);
    // For each column, extract its main content
    columns = colEls.map((col) => {
      // If the column contains only one child, use it directly
      if (col.children.length === 1) {
        return col.children[0];
      }
      // Otherwise, use the whole column element
      return col;
    });
  } else {
    // Fallback: treat all direct children of element as columns
    columns = Array.from(element.children);
  }

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

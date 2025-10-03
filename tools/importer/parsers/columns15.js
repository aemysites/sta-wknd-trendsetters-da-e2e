/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid (these are the columns)
    const colEls = Array.from(grid.children);
    // Each column may have one or more elements, but in this case, each has one
    columns = colEls.map(col => {
      // If the column contains only one child, use that element directly
      if (col.childElementCount === 1) {
        return col.firstElementChild;
      }
      // Otherwise, return the column itself (in case of multiple children)
      return col;
    });
  }

  // Defensive: If no columns found, fallback to the element's children
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }

  // Compose the table rows
  const tableRows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

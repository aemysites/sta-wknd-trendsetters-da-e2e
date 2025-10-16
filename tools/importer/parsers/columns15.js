/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: Find the grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get immediate children of the grid (these are the columns)
    const colEls = Array.from(grid.children);
    // For each column, grab its content
    columns = colEls.map((col) => {
      // If the column has only one child, use it directly
      if (col.children.length === 1) {
        // Reference the actual child element, not clone or create new
        return col.firstElementChild;
      }
      // Otherwise, reference the column element itself
      return col;
    });
  } else {
    // Fallback: treat immediate children of element as columns
    columns = Array.from(element.children);
  }

  // Compose table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

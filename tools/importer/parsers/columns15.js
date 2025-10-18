/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Find the grid layout container (the direct child of the main container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // For each column, extract its content (usually a single child, but could be more)
  const contentRow = columns.map(col => {
    // If the column has only one child, use it directly
    if (col.children.length === 1) {
      // Reference the actual child element, not clone or create new
      return col.firstElementChild;
    }
    // If multiple children, return them as an array
    return Array.from(col.children);
  });

  // Build the table structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

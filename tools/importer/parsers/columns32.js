/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: expect at least two columns

  // Block header row as required
  const headerRow = ['Columns (columns32)'];

  // Each cell is the entire column content (preserving all text, images, structure)
  const columnsRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new block
  element.replaceWith(table);
}

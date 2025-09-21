/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Header row as required by target block
  const headerRow = ['Columns (columns4)'];

  // Second row: Each column's content as a cell (reference, not clone)
  const secondRow = columns.map((col) => col);

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (should be the direct child of .container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Prepare the header row as required by the block spec
  const headerRow = ['Columns block (columns31)'];

  // Prepare the content row: each cell is the full content of the column (reference, not clone)
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

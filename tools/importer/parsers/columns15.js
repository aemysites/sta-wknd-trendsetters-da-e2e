/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header
  const headerRow = ['Columns block (columns15)'];

  // Get the grid container (the direct child of the container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If no columns found, do nothing
  if (!columns.length) return;

  // Each column's content is placed in its own cell in the second row
  const contentRow = columns.map(col => col);

  // Compose the table structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

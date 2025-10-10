/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Get the direct grid container (the columns)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the table row with each column's content
  // Use the entire column element for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns8)'];

  // Defensive: find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // For this block, the first child is the heading, the second is a div with content and button
  // We'll make a two-column row: [heading, right content]
  const col1 = columns[0]; // h2
  const col2 = columns[1]; // div with p and a

  // Defensive: ensure col1 and col2 exist
  if (!col1 || !col2) return;

  // Reference the actual elements, do not clone
  const row = [col1, col2];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

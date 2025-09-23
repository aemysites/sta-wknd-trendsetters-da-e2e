/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container which holds the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main column divs
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: text content (breadcrumbs, heading, meta, social)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Table header
  const headerRow = ['Columns block (columns32)'];

  // Table content row: two columns
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

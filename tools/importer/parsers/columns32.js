/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Column 1: Textual content (breadcrumbs, heading, meta, social)
  const col1 = columns[0];
  // Column 2: Image
  const col2 = columns[1];

  // Header row
  const headerRow = ['Columns (columns32)'];

  // Second row: two columns, left = col1 content, right = col2 image
  // For resilience, include the entire column content blocks
  const row2 = [col1, col2];

  // Build table
  const cells = [headerRow, row2];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}

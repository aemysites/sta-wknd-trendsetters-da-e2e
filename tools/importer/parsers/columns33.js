/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the main columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns.find((col) => col.tagName === 'IMG');

  // Second column: content (text, tags, heading, byline)
  const contentCol = columns.find((col) => col !== imageCol);

  // Defensive: if missing either, fallback to original children order
  const col1 = imageCol || columns[0];
  const col2 = contentCol || columns[1];

  // Table header row
  const headerRow = ['Columns block (columns33)'];
  // Table content row: two columns
  const contentRow = [col1, col2];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

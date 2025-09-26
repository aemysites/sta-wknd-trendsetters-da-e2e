/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the main columns block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (should be two: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns.find((col) => col.tagName === 'IMG');
  // Second column: content (text, headings, etc.)
  const contentCol = columns.find((col) => col !== imageCol);

  // Defensive: if not found, fallback to first/second
  const col1 = imageCol || columns[0];
  const col2 = contentCol || columns[1];

  // Build the table rows
  const headerRow = ['Columns (columns33)'];
  const contentRow = [col1, col2];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

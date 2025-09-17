/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two: image, and content block)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: the image
  const imageCol = columns[0];
  // Second column: the text/content
  const contentCol = columns[1];

  // Table header row
  const headerRow = ['Columns block (columns32)'];
  // Table content row: two columns
  const contentRow = [imageCol, contentCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

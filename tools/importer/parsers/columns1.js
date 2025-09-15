/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns[0];
  // Second column: content (heading, subheading, buttons)
  const contentCol = columns[1];

  // Table header
  const headerRow = ['Columns block (columns1)'];

  // Table content row: image | content
  const contentRow = [imageCol, contentCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

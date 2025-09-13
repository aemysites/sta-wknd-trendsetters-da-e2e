/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns.find((col) => col.tagName === 'IMG' || col.querySelector('img'));
  let imageEl;
  if (imageCol) {
    // If it's an img directly
    imageEl = imageCol.tagName === 'IMG' ? imageCol : imageCol.querySelector('img');
  }

  // Second column: content
  const contentCol = columns.find((col) => col !== imageCol);

  // Table header
  const headerRow = ['Columns block (columns32)'];
  // Table columns row
  const columnsRow = [imageEl, contentCol];

  // Build table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

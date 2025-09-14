/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns.find((col) => col.tagName === 'IMG');
  // Second column: content (heading, paragraph, buttons)
  const contentCol = columns.find((col) => col.tagName !== 'IMG');

  // Defensive: ensure both columns exist
  if (!imageCol || !contentCol) return;

  // Table header row
  const headerRow = ['Columns block (columns1)'];
  // Table content row: image in first cell, content in second cell
  const contentRow = [imageCol, contentCol];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}

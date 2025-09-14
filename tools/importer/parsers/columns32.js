/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container holding the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageEl = columns.find((el) => el.tagName === 'IMG');

  // Second column: content block
  const contentEl = columns.find((el) => el !== imageEl);

  // Defensive: ensure both columns exist
  if (!imageEl || !contentEl) return;

  // Table header
  const headerRow = ['Columns (columns32)'];

  // Table content row: image in first column, content in second
  const contentRow = [imageEl, contentEl];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

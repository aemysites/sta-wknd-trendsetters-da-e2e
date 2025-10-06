/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be image and content)
  const gridChildren = Array.from(grid.children);

  // Find the image element (first column)
  const imgEl = gridChildren.find((el) => el.tagName === 'IMG');

  // Find the content column (second column)
  const contentEl = gridChildren.find((el) => el !== imgEl);

  // Defensive: If missing columns, abort
  if (!imgEl || !contentEl) return;

  // Header row
  const headerRow = ['Columns block (columns33)'];

  // Second row: two columns, image and content
  const columnsRow = [imgEl, contentEl];

  // Build the table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

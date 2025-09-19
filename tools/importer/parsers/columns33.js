/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the main columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: image and content)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image (reference the actual element)
  const img = gridChildren.find((el) => el.tagName === 'IMG');
  // Second column: content block (reference the actual element)
  const content = gridChildren.find((el) => el !== img);

  // Defensive: ensure both columns exist
  if (!img || !content) return;

  // Compose the header row exactly as required
  const headerRow = ['Columns block (columns33)'];

  // Compose the columns row: [image, content]
  const columnsRow = [img, content];

  // Build the table using DOMUtils.createTable
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

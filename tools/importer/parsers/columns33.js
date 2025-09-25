/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be image and content div)
  const gridChildren = Array.from(grid.children);

  // Find the image (first child)
  const img = gridChildren.find((el) => el.tagName === 'IMG');

  // Find the content column (second child)
  const contentCol = gridChildren.find((el) => el !== img);

  // Defensive: If either column is missing, abort
  if (!img || !contentCol) return;

  // Compose the header row
  const headerRow = ['Columns block (columns33)'];

  // Compose the columns row
  // Column 1: image (referenced, not cloned)
  // Column 2: all content from the right column (referenced, not cloned)
  const columnsRow = [img, contentCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

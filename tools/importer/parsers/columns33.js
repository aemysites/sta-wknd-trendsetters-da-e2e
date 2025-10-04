/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be image and content column)
  const gridChildren = Array.from(grid.children);

  // Find the image element (first column)
  const imgEl = gridChildren.find((el) => el.tagName === 'IMG');

  // Find the content column (second column)
  const contentCol = gridChildren.find((el) => el !== imgEl);

  // Defensive: If either column is missing, abort
  if (!imgEl || !contentCol) return;

  // Header row (block name)
  const headerRow = ['Columns block (columns33)'];

  // Second row: two columns, image | content
  const secondRow = [imgEl, contentCol];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

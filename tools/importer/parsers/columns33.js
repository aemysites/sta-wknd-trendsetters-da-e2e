/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns33)'];

  // Defensive: Find the main grid container (the two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be [img, content div])
  const gridChildren = Array.from(grid.children);

  // Left column: image
  const img = gridChildren.find((el) => el.tagName === 'IMG');

  // Right column: content div (contains eyebrow, tag, heading, byline)
  const contentDiv = gridChildren.find((el) => el !== img);

  // Defensive: If either column is missing, abort
  if (!img || !contentDiv) return;

  // Build the second row (columns)
  const columnsRow = [img, contentDiv];

  // Build the table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

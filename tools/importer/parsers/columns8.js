/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout block inside the container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of grid (should be [h2, div])
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // First column: the heading (h2)
  const heading = gridChildren.find((el) => el.tagName === 'H2');

  // Second column: content div (contains paragraph and button)
  const contentDiv = gridChildren.find((el) => el.tagName === 'DIV');

  // Defensive: ensure both columns exist
  if (!heading || !contentDiv) return;

  // Table header row
  const headerRow = ['Columns (columns8)'];

  // Table second row: two columns
  const secondRow = [heading, contentDiv];

  // Build the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

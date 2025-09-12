/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: expect two children: left (heading), right (content)
  if (gridChildren.length < 2) return;

  // First column: heading (h2)
  const heading = gridChildren[0];

  // Second column: content block (contains p and a)
  const contentBlock = gridChildren[1];

  // Compose the columns row
  const columnsRow = [heading, contentBlock];

  // Table header row
  const headerRow = ['Columns (columns14)'];

  // Build the table
  const cells = [headerRow, columnsRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for expected grid structure
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);
  // Defensive: Expecting two children: h2 and a div (with paragraph + button)
  if (gridChildren.length < 2) return;

  // First column: the heading (h2)
  const heading = gridChildren[0];

  // Second column: the content div (with p and button)
  const contentDiv = gridChildren[1];

  // Table header
  const headerRow = ['Columns block (columns8)'];

  // Table content row: two columns side by side
  const contentRow = [heading, contentDiv];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

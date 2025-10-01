/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left content, right image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: content div
  const leftCol = gridChildren[0];
  // Right column: image (img element)
  const rightCol = gridChildren[1];

  // Build the table rows
  const headerRow = ['Columns block (columns28)'];
  const contentRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

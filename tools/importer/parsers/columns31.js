/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Layout analysis from screenshot:
  // - 3 columns visually: left (name + tags), center (heading), right (description)
  // - All content is side-by-side in one row
  // - Block header: 'Columns (columns31)'

  // Extract left column: name + tags
  const leftColEls = [];
  // First child: name
  if (gridChildren[0]) leftColEls.push(gridChildren[0]);
  // Second child: tags container
  if (gridChildren[1]) leftColEls.push(gridChildren[1]);

  // Center column: heading
  const centerColEls = [];
  if (gridChildren[2]) centerColEls.push(gridChildren[2]);

  // Right column: description (rich text)
  const rightColEls = [];
  if (gridChildren[3]) rightColEls.push(gridChildren[3]);

  // Table rows
  const headerRow = ['Columns (columns31)'];
  const columnsRow = [leftColEls, centerColEls, rightColEls];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the element
  element.replaceWith(table);
}

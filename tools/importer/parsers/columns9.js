/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find left column (text block)
  const leftCol = gridChildren.find(child => child.tagName === 'DIV');
  // Find right column (contacts list)
  const rightCol = gridChildren.find(child => child.tagName === 'UL');
  // Find the image (should be the last child)
  const img = gridChildren.find(child => child.tagName === 'IMG');

  // Defensive: If not found, bail
  if (!leftCol || !rightCol || !img) return;

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns9)'];

  // First row: left and right columns
  const columnsRow = [leftCol, rightCol];
  // Second row: image only in first cell (remove empty cell)
  const imageRow = [img];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
    imageRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

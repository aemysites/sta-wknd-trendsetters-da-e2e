/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns: left (text/buttons), right (image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: collect all text and buttons as a single cell
  const leftCol = columns[0];
  const leftCell = document.createElement('div');
  const heading = leftCol.querySelector('.h1-heading');
  if (heading) leftCell.appendChild(heading.cloneNode(true));
  const subheading = leftCol.querySelector('.subheading');
  if (subheading) leftCell.appendChild(subheading.cloneNode(true));
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftCell.appendChild(buttonGroup.cloneNode(true));

  // Right column: image
  const rightCol = columns[1];
  const img = rightCol.querySelector('img');
  if (!img) return; // If there's no image, don't output block
  const rightCell = document.createElement('div');
  rightCell.appendChild(img.cloneNode(true));

  // Header row as required
  const headerRow = ['Columns (columns15)'];

  // Second row: two columns, each cell contains all relevant content
  const row = [leftCell, rightCell];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the grid only (not the whole element), so output is always produced
  grid.replaceWith(table);
}

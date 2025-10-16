/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns39)'];

  // Get the grid layout that contains the two main columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The first column: text content (headline, subheading, buttons)
  const textCol = grid.children[0];
  // The second column: images (inside another grid)
  const imagesCol = grid.children[1];

  // Defensive: check both columns exist
  if (!textCol || !imagesCol) return;

  // For the images, get all immediate img children (should be 3)
  const imagesGrid = imagesCol.querySelector('.w-layout-grid');
  const imgElements = imagesGrid ? Array.from(imagesGrid.querySelectorAll('img')) : [];

  // Build the second row: left cell is the textCol, then each image in its own cell
  const rowCells = [textCol, ...imgElements];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    rowCells
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

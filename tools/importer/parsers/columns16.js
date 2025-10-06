/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a column cell)
  const gridCells = Array.from(grid.children);

  // For each grid cell, find the image inside (reference the actual image element)
  const images = gridCells.map((cell) => {
    const img = cell.querySelector('img');
    return img || document.createTextNode('');
  });

  // Build the table rows
  const headerRow = ['Columns block (columns16)'];
  const imageRow = images;

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

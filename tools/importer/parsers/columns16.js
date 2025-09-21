/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a column cell)
  const gridCells = Array.from(grid.children);

  // For each cell, find the image inside
  const images = gridCells.map(cell => {
    // Defensive: find the first img descendant
    const img = cell.querySelector('img');
    return img || null;
  }).filter(Boolean);

  // Build the table rows
  const headerRow = ['Columns (columns16)'];
  // Each image goes in its own column in the second row
  const imageRow = images;

  // Only build the table if we have at least one image
  if (imageRow.length > 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      imageRow
    ], document);
    element.replaceWith(table);
  }
}

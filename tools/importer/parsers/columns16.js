/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns16)'];

  // Defensive: find the grid layout containing the images
  const grid = element.querySelector('.grid-layout');
  let images = [];
  if (grid) {
    // Get all immediate child divs of the grid
    const gridItems = grid.querySelectorAll(':scope > div');
    images = Array.from(gridItems).map(item => {
      // Find the image inside each grid item
      const img = item.querySelector('img');
      // Only include valid images
      return img ? img : null;
    }).filter(Boolean);
  }

  // Second row: one column per image
  const secondRow = images.length > 0 ? images : [''];

  // Build table rows
  const rows = [headerRow, secondRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}

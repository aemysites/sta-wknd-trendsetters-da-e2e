/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns16)'];

  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) {
    // If not found, remove element and exit
    element.replaceWith(document.createElement('div'));
    return;
  }

  // Get all direct children of the grid (each is a column cell)
  const gridItems = Array.from(grid.children);

  // For each grid item, find its image (if present)
  const images = gridItems.map(item => {
    // Defensive: Find the first img inside this grid item
    const img = item.querySelector('img');
    // Reference the actual image element from the DOM, not a clone
    return img ? img : document.createElement('div'); // fallback empty cell
  });

  // Build the table rows
  const cells = [
    headerRow,
    images // Second row: one image per column
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

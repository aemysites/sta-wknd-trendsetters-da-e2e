/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns8)'];

  // Find the grid container that holds the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a column cell)
  const columnDivs = Array.from(grid.children);

  // For each column, find the image (assume one per column)
  const images = columnDivs.map(col => {
    // Find the image element inside the column
    const img = col.querySelector('img');
    // Reference the actual image element if present
    return img || '';
  });

  // Build the table: header row, then one row with all images as columns
  const tableRows = [
    headerRow,
    images
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

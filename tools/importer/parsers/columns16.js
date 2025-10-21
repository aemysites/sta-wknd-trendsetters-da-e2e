/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns16)'];

  // Defensive: Find the grid container that holds the images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate child divs of the grid (each contains an image)
  const columnDivs = Array.from(grid.children);

  // For each column, extract the image element (first img inside)
  const images = columnDivs.map(colDiv => {
    // Defensive: find the first img inside this column div
    const img = colDiv.querySelector('img');
    return img ? img : null;
  }).filter(Boolean); // Remove nulls

  // The second row should have one cell per image
  const contentRow = images;

  // Build the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns8)'];

  // Defensive: Find the grid container (should be a direct child of the section)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each direct child of the grid is a column
  const columnDivs = Array.from(grid.children);

  // For each column, find the image inside
  const images = columnDivs.map(col => {
    // Defensive: find the first img inside this column
    const img = col.querySelector('img');
    return img ? img : document.createTextNode('');
  });

  // Second row: one cell per image
  const contentRow = images;

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

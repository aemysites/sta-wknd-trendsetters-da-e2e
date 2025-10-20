/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header
  const headerRow = ['Columns (columns16)'];

  // Defensive: Find the grid container with images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Select all immediate child divs of the grid (each is a column)
  const columnDivs = Array.from(grid.children);

  // For each column, find the image inside
  const images = columnDivs.map(colDiv => {
    // Defensive: find the image inside the nested structure
    const img = colDiv.querySelector('img');
    return img ? img : document.createTextNode('');
  });

  // Build the table: header row, then one row with all images as columns
  const cells = [
    headerRow,
    images
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

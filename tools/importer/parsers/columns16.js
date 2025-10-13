/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for Columns (columns16)
  const headerRow = ['Columns (columns16)'];

  // 2. Find the grid container with the images
  // The grid is the first descendant with class 'w-layout-grid'
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 3. Each direct child of the grid is a column, each contains an image
  const columnDivs = Array.from(grid.children);
  const imageCells = columnDivs.map(colDiv => {
    // Find the first image descendant in this column
    const img = colDiv.querySelector('img');
    return img ? img : '';
  });

  // 4. Build the table rows
  const rows = [
    headerRow,
    imageCells
  ];

  // 5. Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element with the new table
  element.replaceWith(table);
}

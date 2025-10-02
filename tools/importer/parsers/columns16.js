/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid container with images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 2. Get all direct children of the grid (each column)
  const columnDivs = Array.from(grid.children);

  // 3. For each column, find the image inside (reference the existing img element)
  const images = columnDivs.map(col => {
    const img = col.querySelector('img');
    return img || '';
  });

  // 4. Header row: use the exact required block name
  const headerRow = ['Columns (columns16)'];

  // 5. Table rows: header + one row with all images as columns
  const tableRows = [
    headerRow,
    images,
  ];

  // 6. Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // 7. Replace the original element with the new table
  element.replaceWith(table);
}

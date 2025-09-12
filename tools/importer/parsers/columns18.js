/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: expect 3 columns: [content, contact list, image]
  const leftCol = columns[0]; // text content
  const rightCol = columns[1]; // contact list (ul)
  const imgCol = columns[2]; // image

  // Compose left cell: all children of leftCol
  const leftCellContent = Array.from(leftCol.childNodes);

  // Compose right cell: all children of rightCol
  const rightCellContent = Array.from(rightCol.childNodes);

  // Compose image cell: the image element
  const imgCellContent = [imgCol];

  // Table header: must match block name exactly
  const headerRow = ['Columns (columns18)'];

  // Table second row: left and right columns
  const secondRow = [leftCellContent, rightCellContent];

  // Table third row: image (single cell, full width)
  const thirdRow = [imgCellContent];

  // Build the table
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

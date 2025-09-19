/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns block (columns2)'];

  // Defensive: Get immediate children of the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Expecting two columns: left (image), right (content)
  // Left column: image
  const leftCol = gridChildren.find(el => el.tagName === 'IMG');
  // Right column: content div (h1, p, buttons)
  const rightCol = gridChildren.find(el => el !== leftCol);

  // Build columns row
  const columnsRow = [leftCol, rightCol];

  // Compose table data
  const tableData = [headerRow, columnsRow];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(blockTable);
}

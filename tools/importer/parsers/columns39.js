/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by the block spec
  const headerRow = ['Columns (columns39)'];

  // Defensive: find the two main grid columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text content (heading, subheading, buttons)
  const leftCol = columns[0];
  // Right column: images grid
  const rightCol = columns[1];

  // Compose left column cell: heading, subheading, button group
  const leftCellContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftCellContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftCellContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Compose right column cell: all images in the nested grid
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  let rightCellContent = [];
  if (imagesGrid) {
    rightCellContent = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

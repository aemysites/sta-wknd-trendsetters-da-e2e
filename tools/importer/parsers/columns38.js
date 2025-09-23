/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs of the main grid
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get the left column (text + buttons)
  const leftCol = mainGrid.children[0];
  // Get the right column (images)
  const rightCol = mainGrid.children[1];

  // Defensive: If structure is not as expected, bail out
  if (!leftCol || !rightCol) return;

  // Left column content
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');

  // Compose left column cell
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Right column images
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let rightCellContent = [];
  if (imagesGrid) {
    // Only include images, ignore other elements
    const imgs = Array.from(imagesGrid.querySelectorAll('img'));
    rightCellContent = imgs;
  }

  // Table header row
  const headerRow = ['Columns (columns38)'];
  // Table columns row
  const columnsRow = [leftCellContent, rightCellContent];

  // Build table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}

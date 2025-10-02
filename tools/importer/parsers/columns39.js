/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the two main column containers (text and images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text content
  const leftCol = columns[0];
  // Right column: images content
  const rightCol = columns[1];

  // --- Left column content ---
  // Find heading, subheading, and button group
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  // Compose left column cell
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // --- Right column content ---
  // Find the inner grid with images
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Compose right column cell
  const rightCellContent = images;

  // Build table rows
  const headerRow = ['Columns (columns39)'];
  const columnsRow = [leftCellContent, rightCellContent];

  // Create block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

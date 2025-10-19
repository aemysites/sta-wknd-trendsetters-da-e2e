/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns39) header row
  const headerRow = ['Columns block (columns39)'];

  // Find the two main columns in the grid
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;
  if (grid && grid.children.length >= 2) {
    leftCol = grid.children[0];
    rightCol = grid.children[1];
  } else {
    // fallback: treat children as columns
    const cols = Array.from(element.children);
    leftCol = cols[0];
    rightCol = cols[1];
  }

  // LEFT COLUMN: headline, subheading, buttons
  const leftContent = [];
  if (leftCol) {
    const headline = leftCol.querySelector('h1');
    if (headline) leftContent.push(headline);
    const subheading = leftCol.querySelector('p');
    if (subheading) leftContent.push(subheading);
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  }

  // RIGHT COLUMN: images (grouped together)
  let rightCell = '';
  if (rightCol) {
    const imageGrid = rightCol.querySelector('.grid-layout');
    const imgs = imageGrid ? Array.from(imageGrid.querySelectorAll('img')) : Array.from(rightCol.querySelectorAll('img'));
    if (imgs.length > 0) {
      const imgContainer = document.createElement('div');
      imgs.forEach(img => imgContainer.appendChild(img));
      rightCell = imgContainer;
    }
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [leftContent, rightCell]
  ];

  // Create and replace with the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

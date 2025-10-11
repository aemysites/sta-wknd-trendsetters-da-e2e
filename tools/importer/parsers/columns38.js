/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Columns block (columns38)'];

  // Find the main grid layout containing two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: headline, subheading, buttons
  const leftCol = columns[0];
  const headline = leftCol.querySelector('h1, .h1-heading');
  const subheading = leftCol.querySelector('p, .subheading');
  const buttonGroup = leftCol.querySelector('.button-group');

  const leftCellContent = [];
  if (headline) leftCellContent.push(headline);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Right column: images (cards), stacked vertically in a single cell
  const rightCol = columns[1];
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  } else {
    images = Array.from(rightCol.querySelectorAll('img'));
  }

  // Create a container to stack images vertically
  const imagesContainer = document.createElement('div');
  imagesContainer.style.display = 'block';
  images.forEach(img => {
    imagesContainer.appendChild(img);
  });

  // Compose the second row: left cell, right cell (all images stacked vertically)
  const secondRow = [leftCellContent, imagesContainer];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

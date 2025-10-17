/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns block (columns39)'];

  // Get the main grid layout (contains two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left text, right images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text, subheading, buttons
  const leftCol = columns[0];
  // Right column: images
  const rightCol = columns[1];

  // --- Left column content ---
  // Heading
  const heading = leftCol.querySelector('h1');
  // Subheading
  const subheading = leftCol.querySelector('p');
  // Buttons
  const buttonGroup = leftCol.querySelector('.button-group');

  // Compose left column cell
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // --- Right column content ---
  // Find the nested grid containing images
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let imagesDiv = null;
  if (imagesGrid) {
    // Get all images inside the images grid
    const imgs = Array.from(imagesGrid.querySelectorAll('img'));
    if (imgs.length) {
      imagesDiv = document.createElement('div');
      imgs.forEach(img => imagesDiv.appendChild(img));
    }
  }

  // Build the table rows
  // Second row: left column (text/buttons), right column (gallery of images)
  const secondRow = [leftCellContent, imagesDiv];

  // Create the block table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

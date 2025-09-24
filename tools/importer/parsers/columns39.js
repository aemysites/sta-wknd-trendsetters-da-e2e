/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row for the block
  const headerRow = ['Columns block (columns39)'];

  // Find the main grid layout (contains two columns: left content, right images)
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get immediate children of the main grid
  const gridChildren = mainGrid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // Left column: text and buttons
  const leftCol = gridChildren[0];
  // Right column: images grid
  const rightCol = gridChildren[1];

  // --- LEFT COLUMN CONTENT ---
  // Get heading, subheading, and button group
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');

  // Compose left column cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // --- RIGHT COLUMN CONTENT ---
  // Find the nested grid with images
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Compose right column cell content (all images)
  const rightCellContent = images;

  // Table structure: header row, then one row with two columns
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

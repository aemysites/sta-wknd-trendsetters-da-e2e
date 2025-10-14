/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: always the block name, exactly as specified
  const headerRow = ['Columns block (columns38)'];

  // Defensive: find the main grid layout (two columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (left: text, right: images)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // --- LEFT COLUMN: Text Content ---
  const leftCol = gridChildren[0];
  const leftCellContent = [];
  // Heading (h1)
  const heading = leftCol.querySelector('h1');
  if (heading) leftCellContent.push(heading);
  // Subheading (p)
  const subheading = leftCol.querySelector('p');
  if (subheading) leftCellContent.push(subheading);
  // Button group (all buttons)
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // --- RIGHT COLUMN: Images ---
  const rightCol = gridChildren[1];
  // Defensive: find the nested grid containing images
  let imagesGrid = rightCol.querySelector('.w-layout-grid');
  if (!imagesGrid) imagesGrid = rightCol; // fallback if images are direct children
  // Get all images (reference existing elements, do not clone)
  const images = Array.from(imagesGrid.querySelectorAll('img'));
  const rightCellContent = images;

  // Build the table rows: header, then content row
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block
  element.replaceWith(block);
}

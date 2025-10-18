/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns38)'];

  // Defensive: Get the main grid layout (contains two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns: left (text/buttons), right (images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- LEFT COLUMN ---
  const leftCol = columns[0];
  // Collect headline, subheading, and button group
  const headline = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  // Compose left column cell content
  const leftCellContent = [];
  if (headline) leftCellContent.push(headline);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // --- RIGHT COLUMN ---
  const rightCol = columns[1];
  // Defensive: Find the grid containing the images
  let imagesGrid = rightCol.querySelector('.grid-layout');
  if (!imagesGrid) imagesGrid = rightCol; // fallback if not nested
  const images = Array.from(imagesGrid.querySelectorAll('img'));
  // Compose right column cell content
  const rightCellContent = images;

  // Build the table rows
  const cells = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

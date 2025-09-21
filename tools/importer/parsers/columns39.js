/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure we are working with the expected structure
  if (!element || !document) return;

  // Header row for the block
  const headerRow = ['Columns (columns39)'];

  // Find the main grid containing the two columns
  // The first child grid contains text/buttons, the second contains images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- First column: text content ---
  const textCol = columns[0];
  // Gather all direct children for semantic grouping
  // We'll include the heading, paragraph, and button group together
  const textContent = [];
  const heading = textCol.querySelector('h1');
  if (heading) textContent.push(heading);
  const subheading = textCol.querySelector('p');
  if (subheading) textContent.push(subheading);
  const buttonGroup = textCol.querySelector('.button-group');
  if (buttonGroup) textContent.push(buttonGroup);

  // --- Second column: images ---
  const imageCol = columns[1];
  // The images are inside a nested grid
  const imageGrid = imageCol.querySelector('.grid-layout');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Build the table rows
  // Second row: two columns, left is text, right is images
  const secondRow = [textContent, images];

  // Compose the table data
  const tableData = [headerRow, secondRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

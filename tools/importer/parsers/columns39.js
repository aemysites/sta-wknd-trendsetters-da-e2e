/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Columns block (columns39)'];

  // Defensive: Get immediate children of the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // --- LEFT COLUMN ---
  const leftCol = columns[0];
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // --- RIGHT COLUMN ---
  const rightCol = columns[1];
  let images = [];
  // Find the nested image grid
  const imageGrid = rightCol.querySelector('.grid-layout');
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Compose table rows
  const secondRow = [leftContent, images];
  const rows = [headerRow, secondRow];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

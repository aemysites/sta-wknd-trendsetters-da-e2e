/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const columns = Array.from(mainGrid.children);
  if (columns.length < 2) return;

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
  const imageGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns38)'];
  const tableRows = [headerRow, [leftContent, images]];

  // Create table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Heading, subheading, buttons
  const leftCol = columns[0];
  const leftContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: Images
  const rightCol = columns[1];
  let rightContent = [];
  // The images are inside a grid-layout div
  const imageGrid = rightCol.querySelector('.grid-layout');
  if (imageGrid) {
    rightContent = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Build the table
  const headerRow = ['Columns block (columns38)'];
  const dataRow = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  element.replaceWith(table);
}

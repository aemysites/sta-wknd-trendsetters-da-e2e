/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns39) header row
  const headerRow = ['Columns block (columns39)'];

  // Find the main grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- LEFT COLUMN: TEXT CONTENT ---
  const textCol = columns[0];
  // Extract heading
  const heading = textCol.querySelector('h1');
  // Extract subheading
  const subheading = textCol.querySelector('p');
  // Extract buttons
  const buttonGroup = textCol.querySelector('.button-group');
  let buttons = [];
  if (buttonGroup) {
    buttons = Array.from(buttonGroup.querySelectorAll('a')).map(a => a);
  }

  // Compose left cell
  const leftCell = document.createElement('div');
  if (heading) leftCell.appendChild(heading);
  if (subheading) leftCell.appendChild(subheading);
  if (buttons.length) {
    const btnWrap = document.createElement('div');
    buttons.forEach(btn => btnWrap.appendChild(btn));
    leftCell.appendChild(btnWrap);
  }

  // --- RIGHT COLUMN: IMAGES ---
  const imageCol = columns[1];
  const imagesGrid = imageCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Compose right cell
  const rightCell = document.createElement('div');
  images.forEach(img => rightCell.appendChild(img));

  // --- Compose table rows ---
  const contentRow = [leftCell, rightCell];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

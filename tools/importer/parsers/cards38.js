/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards38) block header row
  const headerRow = ['Cards (cards38)'];
  const rows = [headerRow];

  // Find the main grid layout containing both text and cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns: left (text), right (cards)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text content (heading, subheading, buttons)
  const leftCol = columns[0];
  const title = leftCol.querySelector('h1');
  const desc = leftCol.querySelector('p');
  const btnGroup = leftCol.querySelector('.button-group');
  const textCell = document.createElement('div');
  if (title) textCell.appendChild(title.cloneNode(true));
  if (desc) textCell.appendChild(desc.cloneNode(true));
  if (btnGroup) textCell.appendChild(btnGroup.cloneNode(true));

  // Right column: grid of card images
  const rightCol = columns[1];
  const imageGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  if (!imageGrid) return;
  const images = Array.from(imageGrid.querySelectorAll('img'));

  // Create a single card row with all text and all images together in one cell
  const cardCell = document.createElement('div');
  cardCell.appendChild(textCell.cloneNode(true));
  images.forEach(img => cardCell.appendChild(img.cloneNode(true)));
  rows.push([cardCell]);

  // Create and replace with block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // Find the left column (text block)
  let leftCol = null;
  let rightCol = null;
  let image = null;

  // There are 3 main children: text block, contact list, image
  // We'll group text block and contact list as left column, image as right column
  // But visually, contact list is on the right of text block, so we need two columns
  // We'll combine text block and contact list into one cell, image into another

  // Find the text block (with h2/h3/p)
  leftCol = gridChildren.find((child) => child.querySelector('h2, h3, p'));
  // Find the contact list (ul)
  const contactList = gridChildren.find((child) => child.tagName === 'UL');
  // Find the image
  image = gridChildren.find((child) => child.tagName === 'IMG');

  // Defensive: if not found, fallback
  if (!leftCol || !contactList || !image) return;

  // Compose left cell: text block + contact list
  const leftCell = [leftCol, contactList];
  // Compose right cell: image only
  const rightCell = image;

  // Build table rows
  const headerRow = ['Columns (columns9)'];
  const contentRow = [leftCell, rightCell];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

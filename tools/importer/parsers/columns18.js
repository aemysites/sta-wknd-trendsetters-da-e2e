/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns wrapper)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the image element (should be a direct child of grid)
  const imgEl = gridChildren.find((el) => el.tagName === 'IMG');

  // Find the left and right columns (the two non-image children)
  const contentColumns = gridChildren.filter((el) => el !== imgEl);
  const leftCol = contentColumns[0]; // Contains heading/subheading
  const rightCol = contentColumns[1]; // Contains the contact list (ul)

  // The right column's contact list (ul)
  let contactList = rightCol && rightCol.querySelector('ul');
  // If not found, fallback to the rightCol itself
  if (!contactList) contactList = rightCol;

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns18)'];

  // Second row: left column (all text content), right column (contacts)
  const secondRow = [leftCol, contactList];

  // Third row: image in left column only (remove empty right column)
  const thirdRow = [imgEl];

  // Compose table rows
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  // Create the table using DOMUtils
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

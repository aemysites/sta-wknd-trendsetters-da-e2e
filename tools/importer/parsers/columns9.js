/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // Identify left column (text + contact info) and right column (image)
  let leftCol = null;
  let rightCol = null;

  // Find the image (right column)
  rightCol = gridChildren.find((el) => el.tagName === 'IMG');

  // Find the left column (the div with headings and ul)
  leftCol = gridChildren.find((el) => el.tagName === 'DIV');

  // Defensive fallback: if not found, try to find by index
  if (!leftCol && gridChildren.length > 0) {
    leftCol = gridChildren[0];
  }
  if (!rightCol && gridChildren.length > 1) {
    rightCol = gridChildren[1];
  }

  // Compose left column content: headings, paragraph, and contact list
  let leftContent = [];
  if (leftCol) {
    // Get headings and paragraph
    const headings = Array.from(leftCol.querySelectorAll('h2, h3, p'));
    leftContent = leftContent.concat(headings);
  }

  // Find the contact list (ul) in the grid
  const contactList = grid.querySelector('ul');
  if (contactList) {
    leftContent.push(contactList);
  }

  // Compose right column content: image
  let rightContent = [];
  if (rightCol) {
    rightContent = [rightCol];
  }

  // Table header
  const headerRow = ['Columns block (columns9)'];
  // Table second row: left and right columns
  const secondRow = [leftContent, rightContent];

  // Create table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

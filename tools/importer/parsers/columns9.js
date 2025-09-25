/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify columns
  // Left column: intro (DIV) + contact list (UL)
  const introDiv = gridChildren.find(el => el.tagName === 'DIV');
  const contactList = gridChildren.find(el => el.tagName === 'UL');
  // Right column: image
  const imageEl = gridChildren.find(el => el.tagName === 'IMG');

  // Compose left column: intro + contact list
  const leftCol = [];
  if (introDiv) leftCol.push(introDiv);
  if (contactList) leftCol.push(contactList);

  // Compose right column: image
  const rightCol = [];
  if (imageEl) rightCol.push(imageEl);

  // Table header row (must match block name exactly)
  const headerRow = ['Columns block (columns9)'];
  // Table content row: left and right columns
  const contentRow = [leftCol, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

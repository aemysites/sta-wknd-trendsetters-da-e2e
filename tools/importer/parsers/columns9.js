/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify left column: text block (h2, h3, p) + contact list (ul)
  let leftBlock = gridChildren.find(child => child.querySelector('h2') && child.querySelector('h3'));
  if (!leftBlock) leftBlock = gridChildren.find(child => child.tagName === 'DIV');
  const contactList = gridChildren.find(child => child.tagName === 'UL');

  // Compose left column content
  const leftColumnContent = [];
  if (leftBlock) leftColumnContent.push(leftBlock);
  if (contactList) leftColumnContent.push(contactList);

  // Identify right column: image
  const rightImage = gridChildren.find(child => child.tagName === 'IMG');
  const rightColumnContent = rightImage ? [rightImage] : [];

  // Table header row (must match block name exactly)
  const headerRow = ['Columns block (columns9)'];
  // Table content row
  const contentRow = [leftColumnContent, rightColumnContent];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

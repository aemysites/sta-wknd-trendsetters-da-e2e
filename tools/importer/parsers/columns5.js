/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Identify left (content) and right (image) columns
  let leftCol = null;
  let rightCol = null;
  children.forEach((child) => {
    if (child.tagName === 'IMG') {
      rightCol = child;
    } else {
      leftCol = child;
    }
  });
  if (!leftCol || !rightCol) return;

  // Extract heading
  const heading = leftCol.querySelector('h2');
  // Extract paragraph (rich text)
  const paragraph = leftCol.querySelector('.rich-text, .w-richtext, p');
  // Extract button group
  const buttonGroup = leftCol.querySelector('.button-group');

  // Compose left column cell: preserve semantic structure
  const leftCell = document.createElement('div');
  if (heading) leftCell.appendChild(heading);
  if (paragraph) leftCell.appendChild(paragraph);
  if (buttonGroup) leftCell.appendChild(buttonGroup);

  // Table header row (must match block name exactly)
  const headerRow = ['Columns block (columns5)'];
  // Table content row: left cell (text/buttons), right cell (image)
  const contentRow = [leftCell, rightCol];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}

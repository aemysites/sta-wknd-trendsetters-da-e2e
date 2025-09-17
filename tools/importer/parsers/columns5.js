/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: content and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: content (heading, paragraph, buttons)
  const contentCol = columns.find((col) => col.querySelector('h2'));
  // Second column: image (img)
  const imageCol = columns.find((col) => col.tagName === 'IMG');

  // Defensive: if not found, fallback to first/second
  const leftCol = contentCol || columns[0];
  const rightCol = imageCol || columns.find((col) => col.tagName === 'IMG') || columns[1];

  // Build left cell: heading, paragraph, buttons
  const heading = leftCol.querySelector('h2');
  const paragraph = leftCol.querySelector('.rich-text, .w-richtext, p');
  const buttonGroup = leftCol.querySelector('.button-group');
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (paragraph) leftCellContent.push(paragraph);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Build right cell: image
  let rightCellContent = [];
  if (rightCol && rightCol.tagName === 'IMG') {
    rightCellContent = [rightCol];
  }

  // Table header
  const headerRow = ['Columns (columns5)'];
  // Table columns row
  const columnsRow = [leftCellContent, rightCellContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  // Replace original element
  element.replaceWith(table);
}

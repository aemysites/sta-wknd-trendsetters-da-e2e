/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (holds columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be: left column, right column, image)
  const gridChildren = Array.from(grid.children);

  // Identify left column (text), right column (contact list), image
  let leftCol = null, rightCol = null, image = null;

  // Find image (img tag)
  image = gridChildren.find((el) => el.tagName === 'IMG');

  // Find UL (contact info list)
  rightCol = gridChildren.find((el) => el.tagName === 'UL');

  // Find left column (the remaining div)
  leftCol = gridChildren.find((el) => el.tagName === 'DIV' && el !== rightCol);

  // Build the columns row: leftCol and rightCol
  const columnsRow = [leftCol, rightCol];

  // Image row: image spanning both columns (repeat image in both cells)
  const imageRow = [image, ''];

  // Build table rows
  const rows = [
    ['Columns (columns9)'], // Header row
    columnsRow,
    imageRow
  ];

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}

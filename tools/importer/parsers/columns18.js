/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be 3: left content, right contact list, image)
  const gridChildren = Array.from(grid.children);

  // Identify columns by tag and content
  let leftCol = null;
  let rightCol = null;
  let imageCol = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV' && child.querySelector('h2')) {
      leftCol = child;
    } else if (child.tagName === 'UL') {
      rightCol = child;
    } else if (child.tagName === 'IMG') {
      imageCol = child;
    }
  });

  // Defensive: ensure we have the required elements
  if (!leftCol || !rightCol || !imageCol) return;

  // Table header row must match the block name exactly
  const headerRow = ['Columns block (columns18)'];

  // Second row: leftCol (text), rightCol (contacts)
  const secondRow = [leftCol, rightCol];

  // Third row: image should span both columns, so put image in both cells
  const thirdRow = [imageCol, imageCol];

  // Compose the table
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

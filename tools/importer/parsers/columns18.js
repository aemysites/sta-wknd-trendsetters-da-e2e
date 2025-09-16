/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container (the direct child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be 3: left content, contact list, image)
  const gridChildren = Array.from(grid.children);

  // Left column: the div with the headings and subheading
  const leftCol = gridChildren.find(el => el.querySelector('h2') && el.querySelector('h3'));

  // Middle column: the ul with contact options
  const middleCol = gridChildren.find(el => el.tagName === 'UL');

  // Right column: the image
  const rightCol = gridChildren.find(el => el.tagName === 'IMG');

  // Compose the left cell: headings and subheading
  let leftCellContent = [];
  if (leftCol) {
    leftCellContent = Array.from(leftCol.childNodes).filter(node => {
      // Only include element nodes (h2, h3, p, etc.)
      return node.nodeType === 1;
    });
  }

  // Compose the middle cell: the ul with contact options
  let middleCellContent = [];
  if (middleCol) {
    middleCellContent = [middleCol];
  }

  // Compose the right cell: the image
  let rightCellContent = [];
  if (rightCol) {
    rightCellContent = [rightCol];
  }

  // Build the table rows
  const headerRow = ['Columns block (columns18)'];
  const contentRow = [
    leftCellContent,
    middleCellContent,
    rightCellContent,
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}

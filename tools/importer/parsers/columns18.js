/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid container (should be the direct child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the left column (text block) and right column (contact list)
  // Assume the first non-img child is the left column, the next non-img is the right column, and the img is the image
  let leftCol = null;
  let rightCol = null;
  let image = null;

  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      image = child;
    } else if (!leftCol) {
      leftCol = child;
    } else if (!rightCol) {
      rightCol = child;
    }
  }

  // Defensive: if the contact list is a <ul>, keep it as is
  // If not, try to find a <ul> inside rightCol
  if (rightCol && rightCol.tagName !== 'UL') {
    const ul = rightCol.querySelector('ul');
    if (ul) rightCol = ul;
  }

  // Compose left cell: leftCol (text) and rightCol (contact list)
  // Compose right cell: image
  const leftCellContent = [];
  if (leftCol) leftCellContent.push(leftCol);
  if (rightCol) leftCellContent.push(rightCol);

  const rightCellContent = image ? [image] : [];

  // Table header
  const headerRow = ['Columns block (columns18)'];
  // Table second row: two columns
  const secondRow = [leftCellContent, rightCellContent];

  // Create the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

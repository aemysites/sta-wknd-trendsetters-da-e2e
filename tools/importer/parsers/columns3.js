/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find the image (left column)
  const leftCol = gridChildren.find((el) => el.tagName === 'IMG');
  // Find the right column (content)
  const rightCol = gridChildren.find((el) => el !== leftCol);

  // Defensive fallback
  if (!leftCol && gridChildren[0]) {
    leftCol = gridChildren[0];
  }
  if (!rightCol && gridChildren[1]) {
    rightCol = gridChildren[1];
  }

  // Compose right column content
  const rightColContent = [];
  if (rightCol) {
    // Heading
    const heading = rightCol.querySelector('h1');
    if (heading) rightColContent.push(heading);
    // Subheading
    const subheading = rightCol.querySelector('p');
    if (subheading) rightColContent.push(subheading);
    // Button group
    const buttonGroup = rightCol.querySelector('.button-group');
    if (buttonGroup) rightColContent.push(buttonGroup);
  }

  // Table header
  const headerRow = ['Columns (columns3)'];
  // Table row: [image, content]
  const columnsRow = [leftCol, rightColContent];
  // Build table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

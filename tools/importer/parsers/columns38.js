/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children of a given element
  function getImmediateChildren(el, selector = 'div') {
    return Array.from(el.querySelectorAll(`:scope > ${selector}`));
  }

  // 1. Header row
  const headerRow = ['Columns (columns38)'];

  // 2. Find the main grid layout (contains two main columns visually)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // The grid has two main children: left (text/buttons), right (images)
  const gridChildren = getImmediateChildren(grid);
  if (gridChildren.length < 2) return;

  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // Left column: heading, subheading, buttons
  // Grab all children as a block
  const leftContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Right column: images (inside a grid)
  let rightContent = [];
  const imageGrid = rightCol.querySelector('.grid-layout');
  if (imageGrid) {
    // Get all images
    const images = Array.from(imageGrid.querySelectorAll('img'));
    rightContent = images;
  }

  // 3. Second row: two columns (left: text/buttons, right: images)
  const secondRow = [leftContent, rightContent];

  // 4. Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element
  element.replaceWith(table);
}

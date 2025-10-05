/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of a node by tag
  function getDirectChildrenByTag(parent, tagName) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tagName.toLowerCase());
  }

  // 1. Header row
  const headerRow = ['Columns (columns39)'];

  // 2. Analyze layout: left column is text/buttons, right column is images (3 images)
  // Source HTML: two main children of grid-layout: left (text/buttons), right (images)
  const gridLayout = element.querySelector('.grid-layout');
  if (!gridLayout) return;
  const gridChildren = getDirectChildrenByTag(gridLayout, 'div');
  if (gridChildren.length < 2) return;

  // Left column: text, subheading, buttons
  const leftCol = gridChildren[0];
  // Right column: images
  const rightCol = gridChildren[1];

  // Left column content
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Right column: get all images inside nested grid-layout
  let rightContent = [];
  const imagesGrid = rightCol.querySelector('.grid-layout');
  if (imagesGrid) {
    const imgs = imagesGrid.querySelectorAll('img');
    rightContent = Array.from(imgs);
  }

  // Compose table: 2 columns, 1 row after header
  const tableCells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace original element
  element.replaceWith(block);
}

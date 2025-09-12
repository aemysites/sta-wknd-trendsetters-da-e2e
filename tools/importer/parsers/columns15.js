/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if element is a header with expected structure
  if (!element || !element.classList.contains('section')) return;

  // Get the main grid layout (contains left text/buttons and right image)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns (left: text/buttons, right: image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: heading, subheading, button group
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Compose left column content
  const leftContent = document.createElement('div');
  // Heading
  const heading = leftCol.querySelector('.h1-heading');
  if (heading) leftContent.appendChild(heading.cloneNode(true));
  // Subheading
  const subheading = leftCol.querySelector('.subheading');
  if (subheading) leftContent.appendChild(subheading.cloneNode(true));
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.appendChild(buttonGroup.cloneNode(true));

  // Compose right column content
  const rightContent = document.createElement('div');
  // Main image
  let mainImg = null;
  if (rightCol.tagName === 'IMG') {
    mainImg = rightCol;
  } else {
    mainImg = rightCol.querySelector('img');
  }
  if (mainImg) rightContent.appendChild(mainImg.cloneNode(true));

  // Table header row
  const headerRow = ['Columns block (columns15)'];
  // Table content row: left column, right column
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block
  element.replaceWith(block);
}

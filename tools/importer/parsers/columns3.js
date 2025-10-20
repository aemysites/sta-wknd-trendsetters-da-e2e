/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (holds image and right column)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get grid children: image and right column
  let imgEl = null;
  let rightCol = null;
  for (const child of grid.children) {
    if (child.tagName === 'IMG') {
      imgEl = child;
    } else {
      rightCol = child;
    }
  }
  if (!imgEl || !rightCol) return;

  // In rightCol: find heading, subheading, and button group
  const heading = rightCol.querySelector('h1');
  const subheading = rightCol.querySelector('p');
  const buttonGroup = rightCol.querySelector('.button-group');

  // Compose right column content as array of references
  const rightColContent = [];
  if (heading) rightColContent.push(heading);
  if (subheading) rightColContent.push(subheading);
  if (buttonGroup) rightColContent.push(buttonGroup);

  // Table structure
  const headerRow = ['Columns block (columns3)'];
  const contentRow = [imgEl, rightColContent];
  const cells = [headerRow, contentRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

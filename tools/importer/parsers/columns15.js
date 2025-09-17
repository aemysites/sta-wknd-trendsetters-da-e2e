/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only operate if element is a header.section
  if (!element || !element.matches('header.section')) return;

  // Find the main grid container for the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be two: left content, right image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: headline, subheading, buttons
  const leftCol = gridChildren[0];
  // Right column: image
  const rightCol = gridChildren[1];

  // Compose left column cell content as a fragment to preserve all text and structure
  const leftFragment = document.createDocumentFragment();
  Array.from(leftCol.childNodes).forEach((node) => {
    // Only append element or text nodes with content
    if (
      (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim() !== '') ||
      (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
    ) {
      leftFragment.appendChild(node.cloneNode(true));
    }
  });

  // Compose right column cell content as a fragment (image)
  const rightFragment = document.createDocumentFragment();
  if (rightCol.tagName === 'IMG') {
    rightFragment.appendChild(rightCol.cloneNode(true));
  } else {
    const img = rightCol.querySelector('img');
    if (img) rightFragment.appendChild(img.cloneNode(true));
  }

  // Table header row
  const headerRow = ['Columns block (columns15)'];
  // Table content row: left column, right column
  const contentRow = [leftFragment, rightFragment];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

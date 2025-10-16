/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container inside the section
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Find left column (text content), right column (contact list), and image
  let leftCol = null, rightCol = null, image = null;
  for (const child of grid.children) {
    if (child.tagName === 'DIV' && !leftCol) {
      leftCol = child;
    } else if (child.tagName === 'UL' && !rightCol) {
      rightCol = child;
    } else if (child.tagName === 'IMG' && !image) {
      image = child;
    }
  }
  // Defensive fallback for image
  if (!image) {
    image = grid.querySelector('img');
  }

  // Compose left column: preserve all headings and paragraphs
  const leftColFragment = document.createDocumentFragment();
  if (leftCol) {
    Array.from(leftCol.children).forEach((node) => {
      leftColFragment.appendChild(node.cloneNode(true));
    });
  }

  // Compose right column: preserve the contact list (ul)
  let rightColFragment = null;
  if (rightCol) {
    rightColFragment = rightCol.cloneNode(true);
  }

  // Table header
  const headerRow = ['Columns (columns9)'];
  // Table second row: two columns (left: text, right: contact list)
  const secondRow = [leftColFragment, rightColFragment];
  // Table third row: image spanning two columns (use actual element, not object)
  const imageRow = [image ? image.cloneNode(true) : ''];

  // Build table
  const cells = [
    headerRow,
    secondRow,
    imageRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

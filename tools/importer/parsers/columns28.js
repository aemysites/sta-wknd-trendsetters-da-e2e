/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text and button content
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Compose left column content
  // Use a fragment to preserve all child nodes and their semantics
  const leftContent = document.createDocumentFragment();
  Array.from(leftCol.childNodes).forEach((node) => {
    leftContent.appendChild(node);
  });

  // Compose right column content (should be just the image)
  // Reference the existing image element directly
  const rightContent = document.createDocumentFragment();
  if (rightCol.tagName === 'IMG') {
    rightContent.appendChild(rightCol);
  } else {
    // If the image is wrapped, find the image inside
    const img = rightCol.querySelector('img');
    if (img) rightContent.appendChild(img);
  }

  // Table structure
  const headerRow = ['Columns block (columns28)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

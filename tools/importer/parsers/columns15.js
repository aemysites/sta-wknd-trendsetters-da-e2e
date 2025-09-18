/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with two columns (headline+desc+buttons and image)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children (should be 2: left content, right image)
  const gridChildren = grid.querySelectorAll(':scope > *');
  if (gridChildren.length < 2) return;

  // Left column: headline, subheading, buttons
  const leftCol = gridChildren[0];
  // Right column: image
  const rightCol = gridChildren[1];

  // Compose left cell: include ALL content blocks from leftCol
  const leftCellContent = [];
  // Get all children in leftCol (to preserve all text and structure)
  leftCol.childNodes.forEach((node) => {
    // Only add elements or text nodes with non-empty content
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      leftCellContent.push(node.cloneNode(true));
    }
  });

  // Compose right cell: image
  const rightCellContent = [];
  // If rightCol is an <img>, use it; otherwise, find the first image inside
  if (rightCol.tagName === 'IMG') {
    rightCellContent.push(rightCol.cloneNode(true));
  } else {
    const img = rightCol.querySelector('img');
    if (img) rightCellContent.push(img.cloneNode(true));
  }

  // Build table rows
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only operate if the element is a header.section
  if (!element || !element.classList.contains('section')) return;

  // Find the main grid container for the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two: content and image)
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns
  if (gridChildren.length < 2) return;

  // First column: text content (heading, subheading, buttons)
  const leftCol = gridChildren[0];
  // Second column: image
  const rightCol = gridChildren[1];

  // --- Left Column Content ---
  // Instead of picking only heading/subheading/button, grab all content blocks
  // This ensures all text content is included
  const leftCellContent = Array.from(leftCol.childNodes).filter(node => {
    // Only include elements and meaningful text nodes
    if (node.nodeType === Node.ELEMENT_NODE) return true;
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
    return false;
  });

  // --- Right Column Content ---
  // If rightCol is an image, use it. Otherwise, get all its children (for flexibility)
  let rightCellContent = [];
  if (rightCol.tagName === 'IMG') {
    rightCellContent = [rightCol];
  } else {
    rightCellContent = Array.from(rightCol.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
      return false;
    });
  }

  // --- Table Construction ---
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftCellContent, rightCellContent];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

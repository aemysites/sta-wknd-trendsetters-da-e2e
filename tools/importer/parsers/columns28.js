/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns (text stack and image)
  if (gridChildren.length < 2) return;

  // Left column: Text stack
  const leftCol = gridChildren[0];
  // Right column: Image
  const rightCol = gridChildren[1];

  // Compose left column content
  // We'll collect all direct children of leftCol for resilience
  const leftColContent = Array.from(leftCol.children);

  // Compose right column content (should be just the image)
  // If it's an image, use it directly
  let rightColContent = rightCol;
  if (rightCol.tagName !== 'IMG') {
    // Defensive: If not an image, look for an image inside
    const img = rightCol.querySelector('img');
    if (img) {
      rightColContent = img;
    } else {
      // If no image found, fallback to empty
      rightColContent = document.createElement('div');
    }
  }

  // Build table rows
  const headerRow = ['Columns (columns28)'];
  const contentRow = [leftColContent, rightColContent];

  // Create block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

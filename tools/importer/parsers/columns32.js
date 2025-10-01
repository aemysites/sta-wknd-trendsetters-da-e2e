/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (the main columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  if (children.length < 2) return;

  // Left column: all content except the image (first child)
  const leftCol = children[0];
  // Right column: image (second child)
  const rightCol = children[1];

  // Defensive: sometimes the image may be inside the first child, check for that
  let imageDiv = null;
  let textDiv = null;
  if (leftCol.querySelector('img')) {
    // If first child contains an image, split it out
    const imgs = leftCol.querySelectorAll('img');
    if (imgs.length === 1 && leftCol.children.length === 2) {
      // Assume leftCol is text, rightCol is image
      textDiv = leftCol;
      imageDiv = rightCol;
    } else {
      // Otherwise, try to find the image container
      imageDiv = leftCol.querySelector('img').closest('div');
      textDiv = leftCol;
    }
  } else {
    textDiv = leftCol;
    imageDiv = rightCol;
  }

  // If imageDiv is not an element with an img, try to find it in rightCol
  let imageElem = null;
  if (imageDiv && imageDiv.querySelector) {
    imageElem = imageDiv.querySelector('img');
  }
  if (!imageElem && rightCol && rightCol.querySelector) {
    imageElem = rightCol.querySelector('img');
  }

  // Build left cell content: breadcrumb, heading, byline, social
  const leftCellContent = [];
  if (textDiv) {
    // Get all direct children except the image container (if present)
    const textChildren = Array.from(textDiv.children).filter((child) => {
      // Exclude image containers
      if (child.querySelector && child.querySelector('img')) return false;
      return true;
    });
    leftCellContent.push(...textChildren);
  }

  // Build right cell content: image
  const rightCellContent = [];
  if (imageElem) {
    rightCellContent.push(imageElem);
  }

  // Compose the table
  const headerRow = ['Columns (columns32)'];
  const contentRow = [leftCellContent, rightCellContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

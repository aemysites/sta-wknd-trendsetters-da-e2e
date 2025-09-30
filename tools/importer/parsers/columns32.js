/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the main two columns: left (text) and right (image)
  let leftCol = null;
  let rightCol = null;

  // If grid has one child, it contains both columns
  if (grid.children.length === 1) {
    const inner = grid.children[0];
    // Left column is the text/image block, right column is the image wrapper
    leftCol = inner;
    // Try to find image wrapper
    const imgWrapper = inner.parentElement.querySelector('.image.cover-image')?.parentElement;
    if (imgWrapper && imgWrapper !== leftCol) {
      rightCol = imgWrapper;
    }
  } else if (grid.children.length === 2) {
    leftCol = grid.children[0];
    rightCol = grid.children[1];
  } else {
    // Fallback: treat all as left column
    leftCol = grid.children[0];
  }

  // Extract left column content
  const leftContent = [];
  if (leftCol) {
    Array.from(leftCol.childNodes).forEach((node) => {
      // Only include elements that are not image wrappers
      if (node.nodeType === 1 && node.classList?.contains('image')) return;
      leftContent.push(node);
    });
  }

  // Extract right column content: only the image
  let rightContent = [];
  if (rightCol) {
    const img = rightCol.querySelector('img');
    if (img) {
      rightContent = [img]; // Reference the actual image element
    }
  }

  // Table header must match target block name exactly
  const headerRow = ['Columns block (columns32)'];
  // Table second row: left and right columns
  const secondRow = [leftContent, rightContent];

  // Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace original element
  element.replaceWith(table);
}

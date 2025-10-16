/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  if (children.length < 2) return;

  // --- LEFT COLUMN ---
  // The left column contains all text content and buttons
  let leftCol, rightCol;
  // Determine which child is the image and which is the text column
  if (children[0].tagName === 'IMG') {
    rightCol = children[0];
    leftCol = children[1];
  } else if (children[1].tagName === 'IMG') {
    leftCol = children[0];
    rightCol = children[1];
  } else {
    // fallback: assume leftCol is first, rightCol is second
    leftCol = children[0];
    rightCol = children[1];
  }

  // Gather all content from the left column (heading, subheading, buttons)
  // Instead of picking individual elements, include all children for flexibility
  const leftCell = Array.from(leftCol.childNodes);
  // For the right column, if it's an image, use the image element directly
  let rightCell = '';
  if (rightCol.tagName === 'IMG') {
    rightCell = rightCol;
  } else {
    // If not, look for an image inside
    const img = rightCol.querySelector('img');
    rightCell = img || '';
  }

  // --- TABLE CREATION ---
  // Block name must match exactly
  const headerRow = ['Columns block (columns3)'];
  const contentRow = [leftCell, rightCell];
  const tableRows = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

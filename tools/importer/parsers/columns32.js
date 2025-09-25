/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid should have two children: left (text) and right (image)
  const gridChildren = Array.from(grid.children);
  let leftCol = null;
  let rightCol = null;
  if (gridChildren.length === 2) {
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  } else if (gridChildren.length === 1) {
    leftCol = gridChildren[0];
    rightCol = null;
  }

  // Defensive: sometimes leftCol itself is a grid, descend one level
  if (leftCol && leftCol.classList.contains('grid-layout')) {
    leftCol = leftCol.children[0];
  }

  // Extract left column content (preserve all semantics)
  const leftContent = document.createElement('div');
  if (leftCol) {
    Array.from(leftCol.childNodes).forEach((node) => {
      // Only append non-empty nodes
      if (
        (node.nodeType === Node.ELEMENT_NODE && (node.textContent.trim() || node.querySelector('img') || node.querySelector('a')))
        || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      ) {
        leftContent.appendChild(node.cloneNode(true));
      }
    });
  }

  // Extract right column content (should be just the image)
  const rightContent = document.createElement('div');
  if (rightCol) {
    const img = rightCol.querySelector('img');
    if (img) {
      rightContent.appendChild(img.cloneNode(true));
    }
  } else if (leftCol) {
    // Sometimes image is a sibling of text content inside leftCol
    const img = leftCol.querySelector('img');
    if (img) {
      rightContent.appendChild(img.cloneNode(true));
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns32)'];
  const contentRow = [leftContent, rightContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

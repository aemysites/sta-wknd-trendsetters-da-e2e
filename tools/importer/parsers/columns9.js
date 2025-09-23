/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify the left (info) and right (image) columns
  let leftColDiv = null;
  let leftColList = null;
  let rightColImg = null;

  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && !leftColDiv) {
      leftColDiv = child;
    } else if (child.tagName === 'UL' && !leftColList) {
      leftColList = child;
    } else if (child.tagName === 'IMG' && !rightColImg) {
      rightColImg = child;
    }
  }

  // Compose left column content: info box (div) + contact list (ul)
  const leftColContent = document.createElement('div');
  if (leftColDiv) {
    Array.from(leftColDiv.childNodes).forEach((node) => {
      leftColContent.appendChild(node.cloneNode(true));
    });
  }
  if (leftColList) {
    leftColContent.appendChild(leftColList.cloneNode(true));
  }

  // Compose right column content: image
  let rightColContent = document.createElement('div');
  if (rightColImg) {
    rightColContent.appendChild(rightColImg.cloneNode(true));
  }

  // Table header must match the target block name exactly
  const headerRow = ['Columns block (columns9)'];
  const contentRow = [leftColContent, rightColContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

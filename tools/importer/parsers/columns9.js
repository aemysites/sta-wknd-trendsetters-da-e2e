/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify left column (intro text), right column (contacts), and image
  let leftCol = null;
  let contactList = null;
  let mainImage = null;

  gridChildren.forEach((child) => {
    if (child.matches('div') && !leftCol) {
      leftCol = child;
    } else if (child.matches('ul') && !contactList) {
      contactList = child;
    } else if (child.matches('img') && !mainImage) {
      mainImage = child;
    }
  });

  // Prepare left column cell: preserve heading hierarchy and text
  const leftColCell = document.createElement('div');
  if (leftCol) {
    Array.from(leftCol.children).forEach((el) => {
      leftColCell.appendChild(el);
    });
  }

  // Prepare right column cell: contact methods
  const contactColCell = document.createElement('div');
  if (contactList) {
    Array.from(contactList.children).forEach((li) => {
      contactColCell.appendChild(li);
    });
  }

  // Table header row
  const headerRow = ['Columns block (columns9)'];
  // Table second row: left (intro), right (contacts)
  const secondRow = [leftColCell, contactColCell];
  // Table third row: image (left), empty (right) to match column count
  const thirdRow = [mainImage, ''];

  // Build table
  const rows = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

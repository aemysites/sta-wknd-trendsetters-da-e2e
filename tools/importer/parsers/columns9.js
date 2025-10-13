/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children
  const children = Array.from(element.querySelectorAll(':scope > .container > .grid-layout > *'));

  // Find left column (text) and right column (contacts)
  let leftCol = null;
  let rightCol = null;
  let image = null;

  // There are typically 3 children: leftCol (div), rightCol (ul), image (img)
  children.forEach((child) => {
    if (child.tagName === 'DIV') {
      leftCol = child;
    } else if (child.tagName === 'UL') {
      rightCol = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Defensive fallback: if not found, try to find them by tag
  if (!leftCol) {
    leftCol = element.querySelector('div');
  }
  if (!rightCol) {
    rightCol = element.querySelector('ul');
  }
  if (!image) {
    image = element.querySelector('img');
  }

  // First row: block name
  const headerRow = ['Columns block (columns9)'];

  // Second row: two columns (leftCol, rightCol)
  const secondRow = [leftCol, rightCol];

  // Third row: image should span both columns, so place the image in the first cell and an empty string in the second cell
  // This ensures the row has the same number of columns as the second row, and avoids using an object
  const thirdRow = [image, ''];

  // Build table
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block table
  element.replaceWith(block);
}

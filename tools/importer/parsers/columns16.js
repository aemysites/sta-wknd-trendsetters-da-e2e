/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // 3. Identify left column (text block), right column (contact list), and image
  let leftCol = null;
  let rightCol = null;
  let image = null;

  // Heuristic: find the <div> with headings for left, <ul> for right, <img> for image
  gridChildren.forEach(child => {
    if (child.tagName === 'DIV' && child.querySelector('h2, h3, h4')) {
      leftCol = child;
    } else if (child.tagName === 'UL') {
      rightCol = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Defensive: fallback to first div for leftCol if not found
  if (!leftCol) {
    leftCol = gridChildren.find(el => el.tagName === 'DIV');
  }
  if (!rightCol) {
    rightCol = gridChildren.find(el => el.tagName === 'UL');
  }
  if (!image) {
    image = gridChildren.find(el => el.tagName === 'IMG');
  }

  // 4. Build the table rows
  const headerRow = ['Columns block (columns16)'];
  const columnsRow = [leftCol, rightCol];
  // Fix: image row must have same number of columns as columnsRow, and contain the image as an actual element
  const imageCell = document.createElement('img');
  if (image) {
    imageCell.src = image.src;
    if (image.alt) imageCell.alt = image.alt;
    if (image.width) imageCell.width = image.width;
    if (image.height) imageCell.height = image.height;
  }
  const imageRow = [imageCell, ''];

  // 5. Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
    imageRow // Two cells: image in first, second cell empty
  ], document);

  // 6. Replace the original element
  element.replaceWith(table);
}

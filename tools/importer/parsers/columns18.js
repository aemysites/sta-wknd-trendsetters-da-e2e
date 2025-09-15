/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the left column (text content)
  let leftCol = null;
  let rightColList = null;
  let image = null;

  // The grid typically has: [leftCol, rightColList, image]
  // But sometimes the order may vary, so let's identify them by tag/class
  gridChildren.forEach(child => {
    if (child.tagName === 'DIV' && child.querySelector('h2, h3, p')) {
      leftCol = child;
    } else if (child.tagName === 'UL') {
      rightColList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Defensive fallback: if image is not found, try to find any img inside grid
  if (!image) {
    image = grid.querySelector('img');
  }

  // Compose left cell: leftCol (intro) + rightColList (contact methods)
  const leftCellContent = [];
  if (leftCol) leftCellContent.push(leftCol);
  if (rightColList) leftCellContent.push(rightColList);

  // Compose right cell: image
  const rightCellContent = image ? [image] : [];

  // Table header
  const headerRow = ['Columns (columns18)'];
  // Table content row: two columns
  const contentRow = [leftCellContent, rightCellContent];

  // Create table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}

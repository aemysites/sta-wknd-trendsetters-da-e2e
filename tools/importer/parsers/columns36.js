/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the top-level grid layout (should have two children: left and right columns)
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Text content and buttons
  const leftCol = columns[0];

  // RIGHT COLUMN: Images grid
  const rightCol = columns[1];

  // For left column, include all its content as a single block
  // This will include heading, subheading, and button group
  const leftContent = document.createElement('div');
  Array.from(leftCol.childNodes).forEach(node => {
    leftContent.appendChild(node.cloneNode(true));
  });

  // For right column, get all images inside the nested grid
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let rightContent;
  if (imagesGrid) {
    rightContent = document.createElement('div');
    Array.from(imagesGrid.querySelectorAll('img')).forEach(img => {
      rightContent.appendChild(img.cloneNode(true));
    });
  } else {
    // Fallback: just include whatever is in the right column
    rightContent = document.createElement('div');
    Array.from(rightCol.childNodes).forEach(node => {
      rightContent.appendChild(node.cloneNode(true));
    });
  }

  // Table header row
  const headerRow = ['Columns block (columns36)'];
  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block
  element.replaceWith(block);
}

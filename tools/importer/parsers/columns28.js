/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Defensive: Expect two columns (left: text stack, right: image)
  if (columns.length < 2) return;

  // Left column (text stack)
  const leftCol = columns[0];
  // Collect all direct children (eyebrow, heading, paragraphs, button)
  const leftContent = [];
  Array.from(leftCol.children).forEach((child) => {
    leftContent.push(child);
  });

  // Right column (image)
  const rightCol = columns[1];
  // Image is direct child (img)
  let imageEl = null;
  if (rightCol.tagName === 'IMG') {
    imageEl = rightCol;
  } else {
    imageEl = rightCol.querySelector('img');
  }
  // Defensive: If no image, leave cell empty
  const rightContent = imageEl ? [imageEl] : [];

  // Table structure
  const headerRow = ['Columns (columns28)'];
  const contentRow = [leftContent, rightContent];

  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}

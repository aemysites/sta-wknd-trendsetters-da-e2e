/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content)
  const gridChildren = Array.from(grid.children);

  // Find image and content column
  let imgCol = null;
  let contentCol = null;
  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      imgCol = child;
    } else {
      contentCol = child;
    }
  });

  // Defensive: If either column missing, fallback to all children
  const columns = [];
  if (imgCol) columns.push(imgCol);
  if (contentCol) columns.push(contentCol);
  if (columns.length < 2) {
    // fallback: use all grid children
    columns.length = 0;
    columns.push(...gridChildren);
  }

  // Table header row
  const headerRow = ['Columns (columns33)'];
  // Second row: two columns, image and content
  const secondRow = columns;

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}

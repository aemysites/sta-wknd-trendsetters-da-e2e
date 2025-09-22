/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two: left and right columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: all content except the image
  const leftCol = columns[0];
  // Second column: the image
  const rightCol = columns[1];

  // --- Defensive: if the image is in the left column, swap ---
  // (In this HTML, the image is in its own div as the second column)
  // But sometimes the order could be different, so check for an img
  let leftContent = leftCol;
  let rightContent = rightCol;
  if (leftCol.querySelector('img') && leftCol.querySelector('img').classList.contains('cover-image')) {
    // If leftCol is just the image, swap
    leftContent = rightCol;
    rightContent = leftCol;
  }

  // Build the table rows
  const headerRow = ['Columns (columns32)'];
  // The second row: two columns, left is text/meta/social, right is image
  const secondRow = [leftContent, rightContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}

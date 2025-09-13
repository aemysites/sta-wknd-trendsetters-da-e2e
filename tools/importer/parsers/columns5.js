/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the two main columns: left (content), right (image)
  // The left column is a div with another grid inside (container)
  // The right column is an <img>
  const children = Array.from(grid.children);
  let leftCol = null;
  let rightCol = null;

  // Find the image (right column)
  rightCol = children.find((el) => el.tagName === 'IMG');
  // Find the left column (should be a div with content)
  leftCol = children.find((el) => el !== rightCol);

  // Defensive: ensure both columns are found
  if (!leftCol || !rightCol) return;

  // The leftCol contains another grid, which contains the actual content
  let leftContent = leftCol;
  const innerGrid = leftCol.querySelector('.w-layout-grid');
  if (innerGrid) {
    // Use the first child of the inner grid as the content block
    const innerChildren = Array.from(innerGrid.children);
    if (innerChildren.length > 0) {
      leftContent = innerChildren[0];
    }
  }

  // Table header
  const headerRow = ['Columns block (columns5)'];
  // Table content row: left is the left content, right is the image
  const contentRow = [leftContent, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

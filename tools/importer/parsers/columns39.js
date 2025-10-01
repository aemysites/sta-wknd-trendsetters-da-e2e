/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag name
  function getDirectChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag.toLowerCase());
  }

  // Find the main grid containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns (left: text/buttons, right: images)
  const gridChildren = getDirectChildrenByTag(grid, 'div');
  if (gridChildren.length < 2) return;
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // LEFT COLUMN: Heading, Subheading, Buttons
  // We'll collect all children in order
  const leftColContent = [];
  Array.from(leftCol.children).forEach(child => {
    leftColContent.push(child);
  });

  // RIGHT COLUMN: Images (inside a nested grid)
  let rightColContent = [];
  const nestedGrid = rightCol.querySelector('.w-layout-grid');
  if (nestedGrid) {
    // Only images
    rightColContent = Array.from(nestedGrid.querySelectorAll('img'));
  } else {
    // Fallback: any images directly in rightCol
    rightColContent = Array.from(rightCol.querySelectorAll('img'));
  }

  // Table structure: header row, then one row with two columns
  const headerRow = ['Columns block (columns39)'];
  const contentRow = [leftColContent, rightColContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

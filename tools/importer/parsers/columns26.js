/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;

  // The main grid with two columns is the first .w-layout-grid inside .container
  const mainGrid = container.querySelector('.w-layout-grid');
  if (!mainGrid) return;

  // Get all direct children of the main grid
  const mainGridChildren = Array.from(mainGrid.children);

  // Defensive: expect at least two columns worth of content
  // First two children are the left and right columns
  // The third child is a nested grid for the lower row
  const leftCol = mainGridChildren[0]; // Heading
  const rightCol = mainGridChildren[1]; // Paragraph
  const lowerGrid = mainGridChildren[2]; // Lower grid with divider, avatar, name, logo

  // Lower grid: get its children
  let lowerGridChildren = [];
  if (lowerGrid && lowerGrid.classList.contains('w-layout-grid')) {
    lowerGridChildren = Array.from(lowerGrid.children);
  }

  // Left lower: avatar + name/title
  let leftLowerCell = null;
  // Right lower: logo (svg)
  let rightLowerCell = null;

  // Find avatar/name block and logo block
  lowerGridChildren.forEach((child) => {
    if (child.querySelector('.avatar')) {
      leftLowerCell = child;
    } else if (child.querySelector('svg')) {
      rightLowerCell = child;
    }
  });

  // Compose first row (columns)
  // Left: heading
  // Right: paragraph
  const firstRow = [
    [leftCol, rightCol]
  ];

  // Compose second row (columns)
  // Left: avatar/name/title
  // Right: logo
  const secondRow = [
    [leftLowerCell, rightLowerCell]
  ];

  // Table header
  const headerRow = ['Columns block (columns26)'];

  // Compose table cells
  const cells = [
    headerRow,
    ...firstRow,
    ...secondRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

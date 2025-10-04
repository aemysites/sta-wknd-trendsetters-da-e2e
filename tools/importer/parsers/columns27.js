/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that holds the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: If fewer than 2 children, bail
  if (gridChildren.length < 3) return;

  // Left column: Heading, paragraph, nested grid (testimonial)
  const leftCol = document.createElement('div');
  // Heading
  if (gridChildren[0]) leftCol.appendChild(gridChildren[0]);
  // Paragraph
  if (gridChildren[1] && gridChildren[1].tagName === 'P') leftCol.appendChild(gridChildren[1]);
  // Nested grid (testimonial)
  if (gridChildren[2] && gridChildren[2].classList.contains('w-layout-grid')) {
    leftCol.appendChild(gridChildren[2]);
  }

  // Right column: logo (utility-display-inline-block inside nested grid)
  let rightCol = document.createElement('div');
  const nestedGrid = gridChildren[2];
  if (nestedGrid && nestedGrid.classList.contains('w-layout-grid')) {
    const logoContainer = nestedGrid.querySelector('.utility-display-inline-block');
    if (logoContainer) rightCol.appendChild(logoContainer);
  }

  // Table header
  const headerRow = ['Columns (columns27)'];
  // Table content row: left and right columns
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

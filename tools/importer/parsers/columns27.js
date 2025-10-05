/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector(':scope > .container') || element;

  // Find the main grid layout (contains the two columns)
  const grid = container.querySelector(':scope > .w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: ensure expected structure
  if (gridChildren.length < 3) return;

  // Left column: heading and testimonial paragraph
  const leftCol = document.createElement('div');
  if (gridChildren[0]) leftCol.appendChild(gridChildren[0]); // Heading
  if (gridChildren[1]) leftCol.appendChild(gridChildren[1]); // Paragraph

  // Right column: testimonial author and logo (from nested grid)
  let rightCol = document.createElement('div');
  const bottomGrid = gridChildren[2];
  if (bottomGrid && bottomGrid.classList.contains('w-layout-grid')) {
    // Remove divider if present
    const avatarRow = bottomGrid.querySelector('.flex-horizontal');
    if (avatarRow) rightCol.appendChild(avatarRow);
    const logoDiv = bottomGrid.querySelector('.utility-display-inline-block');
    if (logoDiv) rightCol.appendChild(logoDiv);
  }

  // Only use rightCol if it has content
  if (!rightCol.hasChildNodes()) rightCol = '';

  // Build the table rows
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // First row: block header
  const headerRow = ['Columns (columns26)'];

  // Second row: two columns
  // Left column: heading
  // Right column: quote paragraph
  const leftCol = gridChildren[0]; // h2-heading
  const rightCol = gridChildren[1]; // paragraph-lg

  // Third row: two columns
  // Left: avatar + name/title
  // Right: logo svg
  const bottomGrid = gridChildren[2];
  let bottomChildren = [];
  if (bottomGrid && bottomGrid.classList.contains('w-layout-grid')) {
    bottomChildren = Array.from(bottomGrid.children);
  }

  // Left bottom: flex-horizontal (avatar + name/title)
  const leftBottom = bottomChildren.find(
    el => el.classList.contains('flex-horizontal')
  );
  // Right bottom: utility-display-inline-block (logo svg)
  const rightBottom = bottomChildren.find(
    el => el.classList.contains('utility-display-inline-block')
  );

  // Compose table rows
  const cells = [
    headerRow,
    [leftCol, rightCol],
    [leftBottom, rightBottom]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

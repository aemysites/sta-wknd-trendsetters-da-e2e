/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the main heading and paragraph (first two children)
  const heading = grid.children[0]; // h2-heading
  const paragraph = grid.children[1]; // paragraph-lg

  // Find the inner grid for the bottom row
  const innerGrid = grid.children[2];
  if (!innerGrid) return;

  // Left bottom: avatar + name/title
  const flexHorizontal = innerGrid.querySelector('.flex-horizontal');
  // Defensive: Find the divider (for layout, not content)
  // Right bottom: SVG logo
  const logoBlock = innerGrid.querySelector('.utility-display-inline-block');

  // Compose left column: heading, paragraph, bottom left (avatar/name/title)
  const leftCol = document.createElement('div');
  leftCol.appendChild(heading);
  leftCol.appendChild(paragraph);
  if (flexHorizontal) leftCol.appendChild(flexHorizontal);

  // Compose right column: divider (optional), logo
  const rightCol = document.createElement('div');
  // Optionally add divider if visually relevant
  // const divider = innerGrid.querySelector('.divider');
  // if (divider) rightCol.appendChild(divider);
  if (logoBlock) rightCol.appendChild(logoBlock);

  // Table header
  const headerRow = ['Columns (columns26)'];
  // Table content row: two columns
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

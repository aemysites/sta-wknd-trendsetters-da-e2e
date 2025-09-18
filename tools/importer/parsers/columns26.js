/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the heading and paragraph (left column, top row)
  const heading = grid.querySelector('.h2-heading');
  const paragraph = grid.querySelector('.paragraph-lg');

  // Find the inner grid for the bottom row
  const innerGrid = grid.querySelector('.w-layout-grid.grid-layout.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  if (!innerGrid) return;

  // Divider
  const divider = innerGrid.querySelector('.divider');

  // Left: avatar, name, role
  const leftFlex = innerGrid.querySelector('.flex-horizontal');

  // Right: SVG logo
  const rightLogo = innerGrid.querySelector('.utility-display-inline-block');

  // Build table rows
  const headerRow = ['Columns block (columns26)'];

  // Compose left column content for row 1
  const leftColTop = document.createElement('div');
  if (heading) leftColTop.appendChild(heading);
  if (paragraph) leftColTop.appendChild(paragraph);

  // Compose left column content for row 2
  const leftColBottom = document.createElement('div');
  if (divider) leftColBottom.appendChild(divider);
  if (leftFlex) leftColBottom.appendChild(leftFlex);

  // Compose right column content for row 2
  let rightColBottom = '';
  if (rightLogo) rightColBottom = rightLogo;

  // Table rows: header, content row 2 only (no unnecessary empty columns)
  const rows = [
    headerRow,
    [leftColTop, rightColBottom]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

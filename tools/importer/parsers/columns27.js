/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid-layout div
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Extract heading and quote
  const heading = mainGrid.querySelector('.h2-heading');
  const quote = mainGrid.querySelector('.paragraph-lg');

  // Find the lower grid (contains divider, avatar row, logo cell)
  const lowerGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  if (!lowerGrid) return;

  // Lower grid children
  const lowerChildren = lowerGrid.children;
  // Defensive: check for expected structure
  if (lowerChildren.length < 3) return;
  // divider = lowerChildren[0] (ignored)
  const avatarRow = lowerChildren[1];
  const logoCell = lowerChildren[2];

  // Avatar row: avatar image and name/title
  const avatarImg = avatarRow.querySelector('.avatar img');
  const nameTitleDivs = avatarRow.querySelectorAll(':scope > div:last-child > div');
  // Compose avatar cell: image and text blocks
  const avatarCell = document.createElement('div');
  if (avatarImg) avatarCell.appendChild(avatarImg);
  nameTitleDivs.forEach(div => avatarCell.appendChild(div));

  // Logo cell: use the logo image if present, else the cell itself
  const logoImg = logoCell.querySelector('img');
  const logoCellContent = logoImg ? logoImg : logoCell;

  // Table header
  const headerRow = ['Columns (columns27)'];
  // Table main row: heading and quote
  const mainRow = [heading, quote];
  // Table lower row: avatar cell and logo cell
  const lowerRow = [avatarCell, logoCellContent];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    mainRow,
    lowerRow
  ], document);

  // Replace element
  element.replaceWith(table);
}

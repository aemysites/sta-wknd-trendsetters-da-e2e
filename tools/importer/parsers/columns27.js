/* global WebImporter */
export default function parse(element, { document }) {
  // Get main grid
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Top row: heading and testimonial
  const heading = mainGrid.querySelector('.h2-heading');
  const testimonial = mainGrid.querySelector('.paragraph-lg');

  // Divider grid (second grid inside main grid)
  const dividerGrid = mainGrid.querySelector('.w-layout-grid.grid-layout:not(:first-child)');
  let avatarImg = null, name = null, title = null, logo = null;

  if (dividerGrid) {
    // Avatar image
    const avatar = dividerGrid.querySelector('.avatar');
    if (avatar) {
      avatarImg = avatar.querySelector('img');
    }
    // Name and title (find the flex-horizontal row, then get divs inside)
    const flexRow = dividerGrid.querySelector('.flex-horizontal');
    if (flexRow) {
      // Get all direct child divs of flexRow
      const divs = Array.from(flexRow.children);
      // Find the div that contains name and title (not avatar)
      const infoDiv = divs.find(div => !div.classList.contains('avatar'));
      if (infoDiv) {
        const infoChildren = infoDiv.querySelectorAll('div');
        if (infoChildren.length > 0) name = infoChildren[0];
        if (infoChildren.length > 1) title = infoChildren[1];
      }
    }
    // Logo (rightmost)
    logo = dividerGrid.querySelector('.utility-display-inline-block img');
    if (!logo) {
      // Fallback: any img in dividerGrid that's not avatarImg
      const imgs = dividerGrid.querySelectorAll('img');
      if (imgs.length > 1) logo = imgs[1];
    }
  }

  // Compose bottom row columns
  const leftCol = document.createElement('div');
  if (avatarImg) leftCol.appendChild(avatarImg.cloneNode(true));
  if (name) leftCol.appendChild(name.cloneNode(true));
  if (title) leftCol.appendChild(title.cloneNode(true));

  const middleCol = document.createElement('div'); // empty spacer
  const rightCol = document.createElement('div');
  if (logo) rightCol.appendChild(logo.cloneNode(true));

  // Table rows
  const headerRow = ['Columns (columns27)'];
  const topRow = [heading ? heading.cloneNode(true) : '', testimonial ? testimonial.cloneNode(true) : ''];
  const bottomRow = [leftCol, middleCol, rightCol];

  // Build table
  const cells = [
    headerRow,
    topRow,
    bottomRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

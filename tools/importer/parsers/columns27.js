/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid layout
  const topGrid = element.querySelector(':scope > div > div');
  if (!topGrid) return;

  // Get children: [heading, testimonial, bottomGrid]
  const topChildren = topGrid.children;
  const heading = topChildren[0]; // <p class="h2-heading">
  const testimonial = topChildren[1]; // <p class="paragraph-lg">
  const bottomGrid = topChildren[2]; // <div class="w-layout-grid ...">

  // Divider (horizontal line) -- REMOVE as a separate row
  // const divider = bottomGrid.querySelector(':scope > .divider');
  // const hr = document.createElement('hr');

  // Bottom row: avatar/user info (left), logo (right)
  const flexRow = bottomGrid.querySelector('.flex-horizontal');
  let avatarCell = [];
  let logoCell = [];

  if (flexRow) {
    // Avatar and user info
    const avatarDiv = flexRow.querySelector('.avatar');
    const avatarImg = avatarDiv ? avatarDiv.querySelector('img') : null;
    const userInfoDiv = flexRow.querySelectorAll(':scope > div')[1];
    let userInfo = [];
    if (userInfoDiv) {
      userInfo = Array.from(userInfoDiv.children);
    }
    if (avatarImg) avatarCell.push(avatarImg);
    if (userInfo.length) avatarCell.push(...userInfo);
  }

  // Logo (right)
  const logoDiv = bottomGrid.querySelector('.utility-display-inline-block');
  if (logoDiv) {
    const logoImg = logoDiv.querySelector('img');
    if (logoImg) logoCell.push(logoImg);
  }

  // Table structure
  const headerRow = ['Columns block (columns27)'];
  const topRow = [heading, testimonial];
  // REMOVED dividerRow
  const bottomRow = [avatarCell, logoCell];

  const cells = [
    headerRow,
    topRow,
    bottomRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the block content
  const grids = element.querySelectorAll('.grid-layout');
  if (!grids.length) return;

  // The first grid-layout contains heading and quote
  const mainGrid = grids[0];
  const heading = mainGrid.querySelector('.h2-heading');
  const quote = mainGrid.querySelector('.paragraph-lg');

  // The second grid-layout (nested) contains divider, avatar/name/title, and logo
  const innerGrid = grids[1];
  if (!innerGrid) return;

  // Divider (horizontal line)
  const divider = innerGrid.querySelector('.divider');
  let dividerEl = null;
  if (divider) {
    dividerEl = document.createElement('hr');
  }

  // Flex row: avatar/name/title (left), logo (right)
  const flexRow = innerGrid.querySelector('.flex-horizontal');
  // Avatar
  const avatarContainer = flexRow ? flexRow.querySelector('.avatar') : null;
  const avatarImg = avatarContainer ? avatarContainer.querySelector('img') : null;
  // Name and title
  let nameDiv = null;
  let titleDiv = null;
  if (flexRow) {
    const nameTitleContainers = Array.from(flexRow.children).filter(c => c !== avatarContainer);
    if (nameTitleContainers.length) {
      nameDiv = nameTitleContainers[0].children[0];
      titleDiv = nameTitleContainers[0].children[1];
    }
  }

  // Logo (right side of flex row)
  const logoContainer = innerGrid.querySelector('.utility-display-inline-block');
  let logoImg = null;
  let logoText = '';
  if (logoContainer) {
    logoImg = logoContainer.querySelector('img');
    // Try to get text node after image, if any
    const nodes = Array.from(logoContainer.childNodes);
    for (const node of nodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        logoText = node.textContent.trim();
        break;
      }
    }
    // If no text node, try alt attribute (for SVG icon with text as alt)
    if (!logoText && logoImg && logoImg.alt && logoImg.alt.trim()) {
      logoText = logoImg.alt.trim();
    }
  }

  // Build table rows
  const headerRow = ['Columns block (columns27)'];

  // First content row: two columns (heading, quote)
  const contentRow1 = [heading, quote];

  // Second content row: two columns
  // Left: avatar + name/title
  const leftCell = [];
  if (avatarImg) leftCell.push(avatarImg);
  if (nameDiv) leftCell.push(nameDiv);
  if (titleDiv) leftCell.push(titleDiv);

  // Right: logo image and text (e.g. '360LAB')
  const rightCell = [];
  if (logoImg) rightCell.push(logoImg);
  if (logoText) rightCell.push(document.createTextNode(logoText));

  // Compose table
  const cells = [
    headerRow,
    contentRow1,
    // Insert divider as a full-width row (two columns)
    dividerEl ? [dividerEl, dividerEl.cloneNode()] : undefined,
    [leftCell, rightCell],
  ].filter(Boolean);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

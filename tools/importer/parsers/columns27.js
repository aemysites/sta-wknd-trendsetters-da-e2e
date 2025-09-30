/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children of a node by tag name
  function getDirectChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag);
  }

  // Find main grid layout (holds columns)
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid (holds the two columns)
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of mainGrid
  const mainGridChildren = Array.from(mainGrid.children);

  // Defensive: Expecting two <p> and one inner grid
  const heading = mainGridChildren.find(el => el.tagName.toLowerCase() === 'p' && el.classList.contains('h2-heading'));
  const quote = mainGridChildren.find(el => el.tagName.toLowerCase() === 'p' && el.classList.contains('paragraph-lg'));
  const innerGrid = mainGridChildren.find(el => el.classList.contains('w-layout-grid') && el !== mainGrid);

  // Defensive: If missing, bail
  if (!heading || !quote || !innerGrid) return;

  // Now innerGrid has three children: divider, flex-horizontal, and logo
  const innerGridChildren = Array.from(innerGrid.children);

  // divider (can ignore), flex-horizontal (avatar + name/title), logo
  const flexHorizontal = innerGridChildren.find(el => el.classList.contains('flex-horizontal'));
  const logoContainer = innerGridChildren.find(el => el.classList.contains('utility-display-inline-block'));

  // flexHorizontal: avatar + name/title
  let avatar = null, nameTitle = null;
  if (flexHorizontal) {
    avatar = flexHorizontal.querySelector('.avatar');
    nameTitle = flexHorizontal.querySelector('div:not(.avatar)');
  }

  // logoContainer: contains an <img>
  let logoImg = null;
  if (logoContainer) {
    logoImg = logoContainer.querySelector('img');
  }

  // Build columns for the second row
  // Screenshot shows two columns: left (heading, avatar, name/title), right (quote, logo)
  const leftCol = document.createElement('div');
  leftCol.appendChild(heading);
  if (avatar) leftCol.appendChild(avatar);
  if (nameTitle) leftCol.appendChild(nameTitle);

  const rightCol = document.createElement('div');
  rightCol.appendChild(quote);
  if (logoImg) rightCol.appendChild(logoImg);

  // Table header
  const headerRow = ['Columns (columns27)'];
  // Table content row
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

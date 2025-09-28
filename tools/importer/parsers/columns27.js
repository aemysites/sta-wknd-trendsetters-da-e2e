/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout in the section
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get direct children of the grid
  const children = grid.children;
  if (children.length < 3) return;

  // First column: left side
  // - Heading (h2)
  // - Avatar image + name/title (below)
  const heading = children[0];
  const quote = children[1];
  const innerGrid = children[2];

  // Defensive: check for expected children
  if (!heading || !quote || !innerGrid) return;

  // innerGrid: divider, flex-horizontal (avatar+name), logo
  const innerChildren = innerGrid.children;
  let avatarDiv = null, nameDiv = null, logoDiv = null;
  if (innerChildren.length >= 3) {
    // flex-horizontal contains avatar and name/title
    const flex = innerChildren[1];
    if (flex && flex.classList.contains('flex-horizontal')) {
      const flexChildren = flex.children;
      avatarDiv = flexChildren[0];
      nameDiv = flexChildren[1];
    }
    logoDiv = innerChildren[2];
  }

  // Compose left column: heading, avatar, name/title
  const leftCol = document.createElement('div');
  leftCol.appendChild(heading);
  if (avatarDiv && nameDiv) {
    leftCol.appendChild(document.createElement('br'));
    leftCol.appendChild(avatarDiv);
    leftCol.appendChild(nameDiv);
  }

  // Compose right column: quote, logo
  const rightCol = document.createElement('div');
  rightCol.appendChild(quote);
  if (logoDiv) {
    rightCol.appendChild(document.createElement('br'));
    rightCol.appendChild(logoDiv);
  }

  // Table header must match block name exactly
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCol, rightCol];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

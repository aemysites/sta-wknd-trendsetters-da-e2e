/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // Find main grid (first .w-layout-grid inside .container)
  const container = element.querySelector('.container');
  if (!container) return;
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  if (!grids.length) return;
  const mainGrid = grids[0];

  // The main grid has:
  // [0]: h2-heading (title)
  // [1]: paragraph-lg (quote)
  // [2]: nested grid (bottom row)
  const gridChildren = getDirectChildren(mainGrid, '*');

  // Defensive: ensure expected structure
  if (gridChildren.length < 3) return;

  // First column: left side (title, avatar, name, role)
  const leftCol = document.createElement('div');
  leftCol.appendChild(gridChildren[0]); // h2-heading

  // Get nested grid (bottom row)
  const nestedGrid = gridChildren[2];
  const nestedChildren = getDirectChildren(nestedGrid, '*');
  // nestedChildren: [divider, flex-horizontal, utility-display-inline-block]
  // flex-horizontal contains avatar, name, role
  const flexHorizontal = nestedChildren.find((el) => el.classList.contains('flex-horizontal'));
  if (flexHorizontal) {
    leftCol.appendChild(flexHorizontal);
  }

  // Second column: right side (quote, logo)
  const rightCol = document.createElement('div');
  rightCol.appendChild(gridChildren[1]); // paragraph-lg
  // nestedChildren[2] is logo image
  const logoDiv = nestedChildren.find((el) => el.classList.contains('utility-display-inline-block'));
  if (logoDiv) {
    rightCol.appendChild(logoDiv);
  }

  // Build table rows
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

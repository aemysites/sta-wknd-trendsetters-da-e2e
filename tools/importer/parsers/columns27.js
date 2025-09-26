/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find the main grid inside the section
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The main grid's direct children:
  // [0]: h2-heading (title)
  // [1]: paragraph-lg (quote)
  // [2]: inner grid (bottom row)
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 3) return;
  const heading = gridChildren[0];
  const quote = gridChildren[1];
  const innerGrid = gridChildren[2];

  // The inner grid has:
  // [0]: divider
  // [1]: flex-horizontal (avatar, name, title)
  // [2]: logo image (right aligned)
  const innerChildren = Array.from(innerGrid.children);
  // Defensive: expect at least 3 children
  if (innerChildren.length < 3) return;
  // We'll use the divider as a visual separator, but usually skip it in content
  const flexRow = innerChildren.find(el => el.classList.contains('flex-horizontal'));
  const logoCell = innerChildren.find(el => el.querySelector('img') && el.classList.contains('utility-display-inline-block'));

  // Build left bottom cell (avatar, name, title)
  let leftBottomCell = null;
  if (flexRow) {
    leftBottomCell = flexRow;
  }

  // Build right bottom cell (logo image)
  let rightBottomCell = null;
  if (logoCell) {
    rightBottomCell = logoCell;
  }

  // Build the table rows
  const headerRow = ['Columns (columns27)'];

  // First content row: two columns (heading+avatar, quote+logo)
  // Left column: heading, avatar row
  // Right column: quote, logo
  const leftCol = document.createElement('div');
  leftCol.appendChild(heading);
  if (leftBottomCell) {
    leftCol.appendChild(document.createElement('br'));
    leftCol.appendChild(leftBottomCell);
  }

  const rightCol = document.createElement('div');
  rightCol.appendChild(quote);
  if (rightBottomCell) {
    rightCol.appendChild(document.createElement('br'));
    rightCol.appendChild(rightBottomCell);
  }

  const contentRow = [leftCol, rightCol];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

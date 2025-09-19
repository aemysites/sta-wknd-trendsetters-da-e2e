/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid-layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting at least 3 children: heading, quote, and the bottom grid
  if (gridChildren.length < 3) return;

  // Extract heading and quote
  const heading = gridChildren[0]; // .h2-heading
  const quote = gridChildren[1];   // .paragraph-lg
  const bottomGrid = gridChildren[2]; // nested grid-layout

  // In the bottomGrid, we expect:
  // [0]: divider
  // [1]: flex-horizontal (avatar, name, title)
  // [2]: logo image
  const bottomGridChildren = Array.from(bottomGrid.children);
  if (bottomGridChildren.length < 3) return;

  // Compose left column: heading, quote, avatar/name/title
  // Compose right column: logo image
  // For avatar/name/title, we want the avatar image and the two lines of text
  const avatarBlock = bottomGridChildren[1];
  const logoBlock = bottomGridChildren[2];

  // Compose left column: heading, quote, avatarBlock
  const leftColumn = document.createElement('div');
  leftColumn.appendChild(heading);
  leftColumn.appendChild(quote);
  leftColumn.appendChild(avatarBlock);

  // Compose right column: logo image
  const rightColumn = document.createElement('div');
  rightColumn.appendChild(logoBlock);

  // Build the table
  const headerRow = ['Columns (columns26)'];
  const columnsRow = [leftColumn, rightColumn];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (2 columns)
  const grid = element.querySelector('.grid-layout.desktop-1-column');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: image (ignore for this block as per instructions)
  // Right column: card content
  const rightCol = gridChildren[1];
  const cardBody = rightCol.querySelector('.card-body');
  if (!cardBody) return;
  const innerGrid = cardBody.querySelector('.grid-layout.desktop-3-column');
  if (!innerGrid) return;
  const innerGridChildren = Array.from(innerGrid.children);
  if (innerGridChildren.length < 2) return;

  // First inner column: image (concert crowd)
  const col1 = innerGridChildren[0];
  // Second inner column: text content (heading, list, button)
  const col2 = innerGridChildren[1];

  // Compose the table
  const headerRow = ['Columns block (columns12)'];
  const dataRow = [col1, col2];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  element.replaceWith(table);
}

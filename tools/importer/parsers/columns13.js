/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid
  const grid = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // First column: left image
  const leftImageContainer = gridChildren[0];
  const leftImage = leftImageContainer && leftImageContainer.querySelector('img');

  // Second column: right content
  const rightContentContainer = gridChildren[1];
  let rightImage = null;
  let rightTextCol = null;
  if (rightContentContainer) {
    const cardBody = rightContentContainer.querySelector('.card-body');
    if (cardBody) {
      const innerGrid = cardBody.querySelector('.w-layout-grid.grid-layout.desktop-3-column');
      if (innerGrid) {
        const innerChildren = Array.from(innerGrid.children);
        rightImage = innerChildren.find((el) => el.tagName === 'IMG');
        rightTextCol = innerChildren.find((el) => el.tagName !== 'IMG');
      }
    }
  }

  // Compose columns for the block table
  const headerRow = ['Columns (columns13)'];
  const columnsRow = [
    rightImage ? rightImage : document.createTextNode(''),
    (() => {
      const content = [];
      if (rightTextCol) {
        // Heading
        const heading = rightTextCol.querySelector('h2');
        if (heading) content.push(heading);
        // List of icon+text pairs
        const flexVertical = rightTextCol.querySelector('.flex-vertical');
        if (flexVertical) {
          const rows = flexVertical.querySelectorAll('.flex-horizontal');
          rows.forEach((row) => content.push(row));
        }
        // Button group
        const buttonGroup = rightTextCol.querySelector('.button-group');
        if (buttonGroup) content.push(buttonGroup);
      }
      return content;
    })(),
  ];

  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

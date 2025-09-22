/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main card body (contains the grid with image and content)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the 3-column grid inside the card body
  const grid = cardBody.querySelector('.grid-layout.desktop-3-column');
  if (!grid) return;

  // Get all columns in the grid
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // First column: heading, list, button
  const firstCol = gridChildren[0];
  // Second column: image of tarts
  const secondCol = gridChildren[1];
  // Third column: crowd image
  const thirdCol = gridChildren[2];

  // Collect all content from the first column (heading, list, button)
  const firstColContent = document.createElement('div');
  firstCol.childNodes.forEach(node => {
    firstColContent.appendChild(node.cloneNode(true));
  });

  // Second column: get the image (tarts)
  let tartImg = secondCol.querySelector('img');
  let tartImgElem = null;
  if (tartImg) tartImgElem = tartImg.cloneNode(true);

  // Third column: get the image (crowd)
  let crowdImg = thirdCol.querySelector('img');
  let crowdImgElem = null;
  if (crowdImg) crowdImgElem = crowdImg.cloneNode(true);

  // Build table rows
  const headerRow = ['Columns block (columns13)'];
  const columnsRow = [firstColContent, tartImgElem, crowdImgElem];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);
  if (table) {
    element.replaceWith(table);
  }
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Extract the background image (first grid child)
  let bgImg = '';
  if (gridChildren.length > 0) {
    const firstGridChild = gridChildren[0];
    const img = firstGridChild.querySelector('img');
    if (img) bgImg = img;
  }

  // Extract the text content (second grid child)
  let contentCell = '';
  if (gridChildren.length > 1) {
    const secondGridChild = gridChildren[1];
    // Only include the .utility-margin-bottom-6rem div (contains h1 and button group)
    const contentDiv = secondGridChild.querySelector('.utility-margin-bottom-6rem');
    if (contentDiv) contentCell = contentDiv;
  }

  // Build the table
  const headerRow = ['Hero (hero29)'];
  const bgImgRow = [bgImg];
  const contentRow = [contentCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

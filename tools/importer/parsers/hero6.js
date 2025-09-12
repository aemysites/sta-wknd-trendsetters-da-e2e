/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the background image (first img in the first grid cell)
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid');
  let bgImg = null;
  if (gridDivs.length > 0) {
    const firstGridCell = gridDivs[0].children[0];
    bgImg = firstGridCell.querySelector('img');
  }

  // Defensive: Find the card containing heading, subheading, and buttons
  let card = null;
  if (gridDivs.length > 0 && gridDivs[0].children.length > 1) {
    const contentGrid = gridDivs[0].children[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      card = contentGrid.querySelector('.card');
    }
  }

  // Table rows
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [card ? card : ''];

  // Create block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

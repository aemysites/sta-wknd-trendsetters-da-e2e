/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid cells
  const gridCells = element.querySelectorAll('.w-layout-grid.grid-layout > div');

  // 1. Background image: first grid cell, .cover-image
  let backgroundImg = '';
  if (gridCells.length > 0) {
    const bgImg = gridCells[0].querySelector('img.cover-image');
    if (bgImg) backgroundImg = bgImg;
  }

  // 2. Content cell: second grid cell, .card
  let contentCell = '';
  if (gridCells.length > 1) {
    const card = gridCells[1].querySelector('.card');
    if (card) contentCell = card;
  }

  // Table header must match block name exactly
  const headerRow = ['Hero (hero24)'];
  const bgRow = [backgroundImg];
  const contentRow = [contentCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

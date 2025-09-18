/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children of a node
  function getDirectChildrenByTag(parent, tagName) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tagName.toLowerCase());
  }

  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row (row 2)
  // Find the background image - first .cover-image inside the first grid cell
  let bgImgCell = null;
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid');
  if (gridDivs.length > 0) {
    const firstGrid = gridDivs[0];
    const firstGridCell = firstGrid.children[0];
    // Defensive: look for .cover-image img inside this cell
    const bgImg = firstGridCell.querySelector('img.cover-image');
    if (bgImg) {
      bgImgCell = [bgImg];
    } else {
      bgImgCell = [''];
    }
  } else {
    bgImgCell = [''];
  }

  // 3. Content row (row 3)
  // Find the card content (headline, list, CTA)
  let contentCell = null;
  if (gridDivs.length > 0) {
    const secondGridCell = gridDivs[0].children[1];
    // Defensive: look for .card-body
    const cardBody = secondGridCell.querySelector('.card-body');
    if (cardBody) {
      // The headline is inside h2.h2-heading
      const headline = cardBody.querySelector('h2.h2-heading');
      // The vertical flex contains the list and CTA
      const verticalFlex = cardBody.querySelector('.flex-vertical');
      let contentParts = [];
      if (headline) contentParts.push(headline);
      if (verticalFlex) contentParts.push(verticalFlex);
      contentCell = contentParts.length ? contentParts : [''];
    } else {
      contentCell = [''];
    }
  } else {
    contentCell = [''];
  }

  // Compose table rows
  const cells = [
    headerRow,
    bgImgCell,
    [contentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by class
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList.contains(className));
  }

  // Find the main .container > .grid-layout
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = getDirectChildByClass(container, 'grid-layout');
  if (!grid) return;

  // The grid has three main children:
  // 1. Main left feature (large card)
  // 2. Top right: two stacked feature cards
  // 3. Bottom right: vertical list of small cards (with dividers)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // 1. Main left feature (big image, tag, heading, desc)
  const mainFeature = gridChildren[0];

  // 2. Top right: two feature cards (each with image, tag, heading, desc)
  const topRight = gridChildren[1];
  // 3. Bottom right: vertical list of small cards (each with heading, desc, divider)
  const bottomRight = gridChildren[2];

  // Compose left column: use the entire mainFeature <a> element
  const leftCol = mainFeature;

  // Compose right column: stack topRight and bottomRight content
  // For topRight, collect both <a> children
  const topRightCards = Array.from(topRight.querySelectorAll(':scope > a'));
  // For bottomRight, collect all <a> (cards), interleaved with dividers
  const bottomRightCards = Array.from(bottomRight.querySelectorAll(':scope > a'));
  const bottomRightDividers = Array.from(bottomRight.querySelectorAll(':scope > .divider'));

  // Interleave bottomRightCards and dividers
  const rightCol = document.createElement('div');
  topRightCards.forEach((card) => rightCol.appendChild(card));
  bottomRightCards.forEach((card, idx) => {
    rightCol.appendChild(card);
    if (bottomRightDividers[idx]) rightCol.appendChild(bottomRightDividers[idx]);
  });

  // Build table rows
  const headerRow = ['Columns (columns37)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

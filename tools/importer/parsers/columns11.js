/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid (headline/text) and image grid
  const topLevelDivs = element.querySelectorAll(':scope > div');
  let mainGrid, imageGrid;
  for (const div of topLevelDivs) {
    if (div.classList.contains('w-layout-grid') && div.classList.contains('grid-layout') && div.classList.contains('tablet-1-column')) {
      mainGrid = div;
    } else if (div.classList.contains('w-layout-grid') && div.classList.contains('grid-layout') && div.classList.contains('mobile-portrait-1-column')) {
      imageGrid = div;
    }
  }

  // --- Top row: headline/eyebrow (left), paragraph/author/button (right) ---
  let leftColContent = '', rightColContent = '';
  if (mainGrid) {
    const mainGridChildren = mainGrid.querySelectorAll(':scope > div');
    // Left column: all text content (including all text and elements)
    const leftCol = mainGridChildren[0];
    if (leftCol) {
      leftColContent = leftCol.textContent.trim();
    }
    // Right column: all text content (including all text and elements)
    const rightCol = mainGridChildren[1];
    if (rightCol) {
      rightColContent = rightCol.textContent.trim();
    }
  }

  // --- Bottom row: images ---
  let img1 = '', img2 = '';
  if (imageGrid) {
    const imageDivs = imageGrid.querySelectorAll(':scope > div');
    const i1 = imageDivs[0]?.querySelector('img');
    const i2 = imageDivs[1]?.querySelector('img');
    if (i1) img1 = i1.outerHTML;
    if (i2) img2 = i2.outerHTML;
  }

  // Always include both content rows, even if one is empty
  const headerRow = ['Columns block (columns11)'];
  const secondRow = [leftColContent, rightColContent];
  const thirdRow = [img1, img2];

  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

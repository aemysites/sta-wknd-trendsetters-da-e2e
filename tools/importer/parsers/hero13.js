/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero13)'];

  // Get the main grid children
  const gridDivs = element.querySelectorAll(':scope > div');

  // --- Row 2: Background image ---
  let backgroundImg = null;
  if (gridDivs.length > 0) {
    backgroundImg = gridDivs[0].querySelector('img');
  }
  const backgroundRow = [backgroundImg ? backgroundImg.cloneNode(true) : ''];

  // --- Row 3: Content overlay ---
  // Extract all content from the overlay grid cell, ensuring all text is included
  let contentCell = document.createElement('div');
  contentCell.style.display = 'flex';
  contentCell.style.flexDirection = 'row';
  contentCell.style.alignItems = 'flex-start';

  if (gridDivs.length > 1) {
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      const cardGrid = cardBody.querySelector('.grid-layout');
      if (cardGrid) {
        // Clone all children of the cardGrid into the contentCell
        Array.from(cardGrid.children).forEach(child => {
          contentCell.appendChild(child.cloneNode(true));
        });
      }
    }
  }

  // Compose table
  const cells = [
    headerRow,
    backgroundRow,
    [contentCell],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

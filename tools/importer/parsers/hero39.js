/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Helper: get direct children by selector
  const getDirectChild = (parent, selector) => {
    return Array.from(parent.children).find(child => child.matches(selector));
  };

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (headline, paragraph, button)
  let contentCell = document.createElement('div');
  if (gridDivs.length > 1) {
    const innerGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      const heading = innerGrid.querySelector('h1');
      if (heading) contentCell.appendChild(heading);
      const flexVertical = innerGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        const paragraph = flexVertical.querySelector('p');
        if (paragraph) contentCell.appendChild(paragraph);
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          const button = buttonGroup.querySelector('a');
          if (button) contentCell.appendChild(button);
        }
      }
    }
  }
  if (!contentCell.hasChildNodes()) {
    const fallbackEls = element.querySelectorAll('h1, h2, h3, p, a');
    fallbackEls.forEach(el => contentCell.appendChild(el));
  }
  const contentRow = [contentCell];

  // 4. Compose table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

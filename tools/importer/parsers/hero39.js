/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  const bgImg = element.querySelector('img.cover-image');
  let bgImgRow = [''];
  if (bgImg) {
    bgImgRow = [bgImg];
  }

  // 3. Content row: heading, paragraph, button
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  let contentCell = '';
  if (gridDivs.length > 1) {
    const contentDiv = gridDivs[1];
    const innerGrid = contentDiv.querySelector('.w-layout-grid');
    if (innerGrid) {
      const contentParts = [];
      const heading = innerGrid.querySelector('h1');
      if (heading) contentParts.push(heading);
      const flexVertical = innerGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        const para = flexVertical.querySelector('p');
        if (para) contentParts.push(para);
        const btnGroup = flexVertical.querySelector('.button-group');
        if (btnGroup) contentParts.push(btnGroup);
      }
      contentCell = contentParts;
    } else {
      contentCell = contentDiv;
    }
  }
  const contentRow = [contentCell];

  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

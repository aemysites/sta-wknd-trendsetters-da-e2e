/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row (block name)
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row
  let bgImg = '';
  // The image is inside the first grid-layout > div
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    const imgEl = gridDivs[0].querySelector('img');
    if (imgEl) bgImg = imgEl;
  }
  const bgImgRow = [bgImg];

  // 3. Content row (headline, subheading, CTA)
  let contentCell = [];
  if (gridDivs.length > 1) {
    const contentGrid = gridDivs[1].querySelector('.grid-layout');
    if (contentGrid) {
      // Headline (h1)
      const h1 = contentGrid.querySelector('h1');
      if (h1) contentCell.push(h1);
      // Subheading and CTA
      const flexVert = contentGrid.querySelector('.flex-vertical');
      if (flexVert) {
        // Paragraph (subheading)
        const para = flexVert.querySelector('p');
        if (para) contentCell.push(para);
        // CTA (button link)
        const btnGroup = flexVert.querySelector('.button-group');
        if (btnGroup) {
          const link = btnGroup.querySelector('a');
          if (link) contentCell.push(link);
        }
      }
    }
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table rows
  const rows = [headerRow, bgImgRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}

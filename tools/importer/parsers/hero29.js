/* global WebImporter */
export default function parse(element, { document }) {
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = null;
  let content = null;

  if (grid) {
    const gridDivs = grid.querySelectorAll(':scope > div');
    if (gridDivs.length > 0) {
      bgImg = gridDivs[0].querySelector('img');
    }
    if (gridDivs.length > 1) {
      // Instead of targeting only .container > .utility-margin-bottom-6rem,
      // get all content from the second gridDiv for flexibility
      const contentParent = gridDivs[1];
      // Collect all text content and elements inside this div
      const parts = [];
      // Get all headings, paragraphs, and links inside contentParent
      contentParent.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button').forEach(el => {
        if (el.textContent.trim()) parts.push(el);
      });
      if (parts.length > 0) {
        content = parts;
      }
    }
  }

  const headerRow = ['Hero (hero29)'];
  const bgImgRow = [bgImg ? bgImg : ''];
  const rows = [headerRow, bgImgRow];
  if (content) {
    rows.push([content]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main grid divs
  const gridDivs = element.querySelectorAll(':scope > div > div');
  let bgImg = null;
  let contentCell = [];

  // 1st grid div: background image
  if (gridDivs[0]) {
    const img = gridDivs[0].querySelector('img');
    if (img) bgImg = img;
  }

  // 2nd grid div: content (heading, paragraph, CTA)
  if (gridDivs[1]) {
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Heading (h1)
      const h1 = contentGrid.querySelector('h1');
      if (h1) contentCell.push(h1);
      // Paragraph (p)
      const p = contentGrid.querySelector('p');
      if (p) contentCell.push(p);
      // CTA (a.button)
      const cta = contentGrid.querySelector('a');
      if (cta) contentCell.push(cta);
    }
  }

  // Compose table rows
  const headerRow = ['Hero (hero41)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];
  const rows = [headerRow, imageRow, contentRow];

  // Create and replace with table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

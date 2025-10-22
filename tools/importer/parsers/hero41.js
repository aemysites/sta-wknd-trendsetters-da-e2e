/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero41)'];

  // 2. Find the background image (should be the <img> in the first grid cell)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    // First grid cell contains the image
    const img = gridDivs[0].querySelector('img');
    if (img) {
      bgImg = img;
    }
  }

  // 3. Find the text content (headline, paragraph, CTA)
  // Second grid cell contains the content
  let contentCell = document.createElement('div');
  if (gridDivs.length > 1) {
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Headline
      const h1 = contentGrid.querySelector('h1');
      if (h1) contentCell.appendChild(h1);
      // Subheading (paragraph)
      const paragraph = contentGrid.querySelector('p');
      if (paragraph) contentCell.appendChild(paragraph);
      // CTA (button link)
      const cta = contentGrid.querySelector('a');
      if (cta) contentCell.appendChild(cta);
    }
  }

  // 4. Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

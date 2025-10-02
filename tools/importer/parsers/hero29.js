/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row
  let bgImgEl = null;
  // Find the image inside the first grid cell (background image)
  const gridLayout = element.querySelector('.w-layout-grid');
  if (gridLayout) {
    const gridCells = gridLayout.children;
    if (gridCells.length > 0) {
      const img = gridCells[0].querySelector('img');
      if (img) bgImgEl = img;
    }
  }
  const imageRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content row (title, subheading, CTA)
  let contentCell = [];
  if (gridLayout && gridLayout.children.length > 1) {
    const contentDiv = gridLayout.children[1];
    // Find the heading(s)
    const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentCell.push(h));
    // Find any paragraphs
    const paragraphs = contentDiv.querySelectorAll('p');
    paragraphs.forEach(p => contentCell.push(p));
    // Find CTA (button or link)
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup) {
      Array.from(buttonGroup.children).forEach(child => contentCell.push(child));
    }
  }
  if (contentCell.length === 0) contentCell = [''];
  const contentRow = [contentCell];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (img tag)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // Find the content area (headline, paragraph, button)
  let contentDiv = null;
  const containerDiv = element.querySelector('.container');
  if (containerDiv) {
    contentDiv = containerDiv.querySelector('.w-layout-grid');
  }

  // Compose the content cell
  const contentCell = [];
  if (contentDiv) {
    // Headline (h1)
    const h1 = contentDiv.querySelector('h1');
    if (h1) contentCell.push(h1);
    // Paragraph (subheading)
    const para = contentDiv.querySelector('p');
    if (para) contentCell.push(para);
    // CTA Button (a)
    const btn = contentDiv.querySelector('a');
    if (btn) contentCell.push(btn);
  }

  // Build the table rows
  const headerRow = ['Hero (hero39)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row
  // Find the image element (background)
  let bgImg = null;
  // Get all immediate child divs of the header
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  // If not found, fallback to any img inside header
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (headline, paragraph, CTA)
  let contentCell = [];
  // Find the content container
  let contentDiv = null;
  for (const div of gridDivs) {
    if (div.querySelector('h1')) {
      contentDiv = div;
      break;
    }
  }
  if (contentDiv) {
    // Headline
    const headline = contentDiv.querySelector('h1');
    if (headline) contentCell.push(headline);
    // Paragraph
    const paragraph = contentDiv.querySelector('p');
    if (paragraph) contentCell.push(paragraph);
    // CTA (button/link)
    const cta = contentDiv.querySelector('.button-group a, a.button');
    if (cta) contentCell.push(cta);
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

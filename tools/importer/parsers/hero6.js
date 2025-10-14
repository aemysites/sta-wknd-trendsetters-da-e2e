/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Table header row ---
  const headerRow = ['Hero (hero6)'];

  // --- 2. Background image row ---
  // Find the background image (img tag with cover-image class)
  const bgImg = element.querySelector('img.cover-image');
  let bgImgCell = '';
  if (bgImg) {
    // Reference the existing image element, do not clone or create new
    bgImgCell = bgImg;
  }

  // --- 3. Content row ---
  // Find the card containing the heading, subheading, and CTA buttons
  const card = element.querySelector('.card');
  let contentCell = '';
  if (card) {
    // Extract heading (h1)
    const heading = card.querySelector('h1');
    // Extract subheading (p)
    const subheading = card.querySelector('p');
    // Extract button group
    const buttonGroup = card.querySelector('.button-group');
    // Compose cell content
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (subheading) cellContent.push(subheading);
    if (buttonGroup) cellContent.push(buttonGroup);
    if (cellContent.length) {
      contentCell = cellContent;
    }
  }

  // --- 4. Assemble table ---
  const cells = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

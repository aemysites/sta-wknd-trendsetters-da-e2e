/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row (must match block name exactly)
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  let bgImgCell = '';
  const img = element.querySelector('img.cover-image');
  if (img) {
    bgImgCell = img;
  }

  // 3. Content row (headline, subheading, CTAs)
  let contentCell = '';
  // Find the card containing all text/buttons
  const card = element.querySelector('.card');
  if (card) {
    contentCell = card;
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

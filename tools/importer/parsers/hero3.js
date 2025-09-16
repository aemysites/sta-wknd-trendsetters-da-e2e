/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Find background image (first img inside the header)
  let bgImg = element.querySelector('img');
  let bgImgCell = '';
  if (bgImg) {
    bgImgCell = bgImg;
  }

  // 3. Find card content block (contains heading, subheading, buttons)
  // Defensive: Find the deepest .card element
  let card = element.querySelector('.card');
  let contentCell = '';
  if (card) {
    // We'll reference the whole card block for resilience
    contentCell = card;
  }

  // 4. Compose table rows
  const rows = [
    headerRow,                 // Row 1: Block name
    [bgImgCell],               // Row 2: Background image
    [contentCell],             // Row 3: Content block (heading, subheading, CTAs)
  ];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace original element
  element.replaceWith(block);
}

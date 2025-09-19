/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Hero (hero6)'];

  // --- Extract background image (row 2) ---
  // Find the first img inside the header (background image)
  const bgImg = element.querySelector('img');
  let bgImgCell = '';
  if (bgImg) {
    bgImgCell = bgImg;
  }

  // --- Extract content (row 3) ---
  // Find the card containing the text and CTAs
  let contentCell = '';
  // The card is a div with class 'card ...'
  const card = element.querySelector('.card');
  if (card) {
    // We'll include the card's children (heading, subheading, button group)
    // Find heading (h1), subheading (p), and button group
    const contentParts = [];
    const h1 = card.querySelector('h1');
    if (h1) contentParts.push(h1);
    const subheading = card.querySelector('p');
    if (subheading) contentParts.push(subheading);
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Add all buttons as-is
      const buttons = Array.from(buttonGroup.children);
      if (buttons.length) contentParts.push(...buttons);
    }
    contentCell = contentParts;
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero6) block parsing
  // Table: 1 column, 3 rows

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the background image (img.cover-image)
  let bgImg = element.querySelector('img.cover-image');
  // Defensive: If not found, try any img in first grid child
  if (!bgImg) {
    const firstGridDiv = element.querySelector(':scope > div > div');
    bgImg = firstGridDiv ? firstGridDiv.querySelector('img') : null;
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row
  // Find the card with heading, subheading, and CTA
  let card = element.querySelector('.card');
  let contentCell = [];
  if (card) {
    // Heading
    const heading = card.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Subheading
    const subheading = card.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // CTA buttons (all <a> in .button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) contentCell.push(...buttons);
    }
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const rows = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}

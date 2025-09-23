/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the background image <img> (direct child somewhere in the header)
  const bgImg = element.querySelector('img.cover-image');
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (headline, subheading, CTA)
  // Find the card containing the text and buttons
  const card = element.querySelector('.card');
  const contentFragments = [];
  if (card) {
    // Heading (h1)
    const heading = card.querySelector('h1');
    if (heading) contentFragments.push(heading);
    // Subheading (p.subheading)
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentFragments.push(subheading);
    // Button group (CTAs)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentFragments.push(buttonGroup);
  }
  const contentRow = [contentFragments];

  // Compose table
  const rows = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

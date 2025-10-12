/* global WebImporter */
export default function parse(element, { document }) {
  // --- Row 2: Background Image ---
  let bgImg = null;
  // Find the image element (background)
  const bgImgEl = element.querySelector('img');
  if (bgImgEl) {
    bgImg = bgImgEl;
  }

  // --- Row 3: Content (Title, Subheading, CTA) ---
  let contentCell = [];
  // Find the card overlay containing text/buttons
  let card = element.querySelector('.card');
  if (card) {
    // Title (h1)
    const title = card.querySelector('h1');
    if (title) contentCell.push(title);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // CTA buttons (all <a> inside .button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) contentCell.push(...buttons);
    }
  }

  // Build table rows
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [headerRow, imageRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

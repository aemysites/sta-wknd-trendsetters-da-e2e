/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Header row ---
  const headerRow = ['Hero (hero6)'];

  // --- 2. Background image row ---
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }
  const imgRow = [bgImg ? bgImg : ''];

  // --- 3. Content row ---
  // Find the card with heading, subheading, and buttons
  let card = null;
  if (gridDivs.length > 1) {
    card = gridDivs[1].querySelector('.card');
  }

  // Defensive: If card exists, extract heading, subheading, buttons
  let contentEls = [];
  if (card) {
    // Heading (h1)
    const heading = card.querySelector('h1');
    if (heading) contentEls.push(heading);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) contentEls.push(subheading);
    // Button group
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Extract all anchor elements (CTAs)
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) contentEls.push(...buttons);
    }
  }
  const contentRow = [contentEls.length ? contentEls : ''];

  // --- Compose table ---
  const cells = [headerRow, imgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}

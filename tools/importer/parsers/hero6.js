/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row - MUST match block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Extract background image (first img in hero block)
  const bgImg = element.querySelector('img');
  // Reference the actual image element if present
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Extract hero overlay content: heading, subheading, CTA(s)
  // Find the card containing the text/buttons
  const card = element.querySelector('.card');
  let contentFragments = [];
  if (card) {
    // Heading (h1)
    const heading = card.querySelector('h1');
    if (heading) contentFragments.push(heading);
    // Subheading (p) - only the first paragraph
    const subheading = card.querySelector('p');
    if (subheading) contentFragments.push(subheading);
    // Button group (CTAs)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Only include anchor elements (links)
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) contentFragments.push(...buttons);
    }
  }
  // Defensive: if no content, use empty string
  const contentRow = [contentFragments.length ? contentFragments : ''];

  // 4. Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero12)'];

  // 2. Extract background image (first img in hero)
  let bgImg = element.querySelector('img');
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Extract hero content (heading, subheading, CTA)
  // Find the card container with text and buttons
  let card = element.querySelector('.card');
  let contentElements = [];
  if (card) {
    // Heading
    const heading = card.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading
    const subheading = card.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTA group
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Extract all anchor buttons
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) {
        // Place all CTAs in a div for grouping
        const ctaDiv = document.createElement('div');
        ctas.forEach(btn => ctaDiv.appendChild(btn));
        contentElements.push(ctaDiv);
      }
    }
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // 4. Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(table);
}

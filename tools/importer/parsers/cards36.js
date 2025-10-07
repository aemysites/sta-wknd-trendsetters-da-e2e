/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // Each card is a div.utility-aspect-1x1 containing an img
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (img) {
      // First column: image, Second column: alt text content (from HTML)
      const altText = img.getAttribute('alt') || '';
      rows.push([img, altText]);
    }
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

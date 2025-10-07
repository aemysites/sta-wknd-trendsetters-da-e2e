/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Each card is a div.utility-aspect-1x1 containing an img
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  cardDivs.forEach(cardDiv => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (img) {
      // Even if no text, second cell must be present
      rows.push([img, '']);
    }
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

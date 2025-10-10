/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, first col = image, second col = text (empty if no visible text)
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Select all card containers (each .utility-aspect-1x1 is a card)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  cardDivs.forEach(cardDiv => {
    // Find the image inside each card
    const img = cardDiv.querySelector('img');
    // No visible text in HTML or screenshot, so second column is empty
    if (img) {
      rows.push([img, '']);
    }
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

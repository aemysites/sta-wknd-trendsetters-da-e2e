/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: grid of image-only cards
  // 1. Header row
  const headerRow = ['Cards (cards36)'];

  // 2. Card rows: each card is an image in the first cell, second cell is empty (required by block spec)
  const cardRows = [];

  // Select all card containers (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');
  cardDivs.forEach(cardDiv => {
    // Find the image inside each card
    const img = cardDiv.querySelector('img');
    if (img) {
      // Each card row: [image, empty cell]
      cardRows.push([img, '']);
    }
  });

  // Build the table data
  const cells = [headerRow, ...cardRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

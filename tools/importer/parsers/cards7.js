/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: extract each card's image as a single cell (no extra text column)
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Find all card containers (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  cardDivs.forEach(cardDiv => {
    // Find the image inside each card
    const img = cardDiv.querySelector('img');
    if (img) {
      rows.push([img]); // Only image per card row
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

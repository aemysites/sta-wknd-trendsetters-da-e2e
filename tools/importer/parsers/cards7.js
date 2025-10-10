/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 1 column, multiple rows, first row is header
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Find all card containers (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    // Defensive: only process if image exists
    if (img) {
      // Only image is present in the card, no text content
      rows.push([img]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows. Each card: image in col 1, empty text cell in col 2 (no visible text)
  const headerRow = ['Cards (cards7)'];

  // Get all card containers (utility-aspect-1x1)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // For each card, extract the image element and add an empty cell for text
  const cardRows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, '']; // image in first cell, empty string in second cell
  });

  // Compose the table cells
  const cells = [headerRow, ...cardRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

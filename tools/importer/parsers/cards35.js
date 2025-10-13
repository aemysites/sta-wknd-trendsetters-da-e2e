/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: grid of image cards, image only per row
  const headerRow = ['Cards (cards35)'];

  // Find all card containers (each is a div.utility-aspect-1x1 containing an img)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // For each card, extract only the image element
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img]; // Only image in the row
  });

  // Build the table: header row, then one row per card
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

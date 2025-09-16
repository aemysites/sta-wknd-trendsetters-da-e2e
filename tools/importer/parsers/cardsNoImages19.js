/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Get all immediate card divs (each card is a flex-horizontal)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the text content for the card
    // Usually the <p> inside the card div
    const text = cardDiv.querySelector('p');
    if (text) {
      rows.push([text]); // Reference the actual <p> element
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

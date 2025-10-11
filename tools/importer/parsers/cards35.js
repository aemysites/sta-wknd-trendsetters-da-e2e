/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, first col image, second col text (none in this case)
  // Header row
  const headerRow = ['Cards (cards35)'];

  // Find all card containers (each .utility-aspect-1x1 is a card)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  // For each card, extract the image (mandatory), and text (none in this HTML)
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    // Reference the actual image element, do not clone or create new
    // Second column: no text content in source, so leave blank
    return [img, ''];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

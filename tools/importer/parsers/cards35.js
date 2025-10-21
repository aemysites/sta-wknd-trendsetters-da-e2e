/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: header row
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // Each card is a direct child div with a single image inside
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    // Always create two columns: image and text (empty if no text)
    if (img) {
      rows.push([img, '']);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

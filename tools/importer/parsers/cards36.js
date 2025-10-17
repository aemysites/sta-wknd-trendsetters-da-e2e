/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // Find all card containers (each card is a .utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains an image only
    const img = cardDiv.querySelector('img');
    if (img) {
      // First cell: image element (reference, not cloned)
      // Second cell: empty (no text content in this variant)
      rows.push([img, '']);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Defensive: get all direct children (each is a card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the text paragraph (description)
    const para = cardDiv.querySelector('p');
    // Defensive: sometimes the icon wrapper is present, sometimes not
    // We ignore the icon for the 'no images' variant
    // Only keep the text content
    if (para) {
      rows.push([para]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

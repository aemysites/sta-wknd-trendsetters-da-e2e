/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: grid of image-only cards, no visible text
  const headerRow = ['Cards (cards35)'];

  // Each card is a child div containing an img
  const cardDivs = Array.from(element.children);

  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (img) {
      return [img, '']; // image in first cell, second cell intentionally left empty (no visible text)
    }
    return null;
  }).filter(Boolean);

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: header row, then two columns per card (image + empty text)
  const headerRow = ['Cards (cards12)'];
  const cardDivs = Array.from(element.children);
  // Each card row: [image, ''] (second column empty since no text)
  const rows = cardDivs.map(card => {
    const img = card.querySelector('img');
    if (!img) return null;
    return [img, ''];
  }).filter(Boolean);
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

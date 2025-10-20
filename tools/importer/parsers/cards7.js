/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: extract each card's image and add empty text column for block consistency
  const headerRow = ['Cards (cards7)'];
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Two columns: image, empty text
    return [img, ''];
  }).filter(Boolean);
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}

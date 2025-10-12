/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: header row, then each card as a row with image and alt text as text cell
  const headerRow = ['Cards (cards35)'];
  const cardDivs = Array.from(element.children);
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Use alt text for the text cell (visible text), image in first cell
    const text = img && img.alt ? img.alt.trim() : '';
    return [img, text];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

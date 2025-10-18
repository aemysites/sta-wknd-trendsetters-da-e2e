/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: grid of cards, each card contains only an image (no visible text)
  const headerRow = ['Cards (cards35)'];

  // Find all card elements (each immediate child div is a card)
  const cardDivs = Array.from(element.children);

  // For each card, extract the image (first img in each card)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Each card row: image only (no text content)
    return [img, ''];
  }).filter(Boolean);

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: grid of cards, each with only an image per card (no visible text content)
  // 1. Header row (single cell)
  const headerRow = ['Cards (cards35)'];

  // 2. Extract card items
  // Each card is a div.utility-aspect-1x1 containing an img
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // Each card row: [image] (image only, no second column)
  const cardRows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    return [img];
  }).filter(Boolean);

  // 3. Build table (one column per row)
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 4. Replace the original element
  element.replaceWith(table);
}

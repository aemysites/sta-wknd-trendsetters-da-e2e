/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards7)'];

  // 2. Find all card elements (each immediate child div of the grid container)
  const cardDivs = Array.from(element.children);

  // 3. Build card rows: each row is [image, text content] (text content is empty for these cards)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (img) {
      return [img, '']; // always two columns: image, then empty text
    }
    return null;
  }).filter(Boolean);

  // 4. Compose table data
  const cells = [headerRow, ...rows];

  // 5. Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace original element with block
  element.replaceWith(block);
}

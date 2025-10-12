/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: grid of cards, each with image and (empty) text content
  // 1. Header row
  const headerRow = ['Cards (cards36)'];

  // 2. Find all card elements (each card is a div.utility-aspect-1x1 containing an img)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // 3. Build rows: each row is [image, text content] (two columns: image, text)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Clone the image node for table cell
    const imgClone = img.cloneNode(true);
    // No visible text content, so second cell is empty string
    return [imgClone, ''];
  }).filter(Boolean);

  // 4. Assemble table data
  const tableData = [headerRow, ...rows];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Replace original element with new block
  element.replaceWith(block);
}

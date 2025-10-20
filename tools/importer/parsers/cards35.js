/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: images only, no text, 2 columns, multiple rows
  // 1. Header row
  const headerRow = ['Cards (cards35)'];

  // 2. Find all card elements (each immediate child div in the grid container)
  const cardDivs = Array.from(element.children);

  // 3. For each card, extract the image (first child img)
  const rows = cardDivs.map(cardDiv => {
    // Defensive: find the img inside the card div
    const img = cardDiv.querySelector('img');
    // First cell: image element (reference, not clone)
    // Second cell: empty string (no text in screenshot or HTML)
    return [img, ''];
  });

  // 4. Compose the table data
  const tableData = [headerRow, ...rows];

  // 5. Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Replace the original element with the new block table
  element.replaceWith(blockTable);
}

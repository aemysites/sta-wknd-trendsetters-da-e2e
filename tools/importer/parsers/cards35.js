/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows. Each row: image | text (alt text if present, otherwise empty)
  const headerRow = ['Cards (cards35)'];

  // Find all card elements (each immediate child div of the grid container)
  const cardDivs = Array.from(element.children);

  // For each card, extract the image (first cell), and alt text (second cell, or empty string)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    const imgClone = img.cloneNode(true);
    // Use the alt attribute as the card text (second cell), or empty string if not present
    const altText = imgClone.getAttribute('alt') || '';
    return [imgClone, altText];
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

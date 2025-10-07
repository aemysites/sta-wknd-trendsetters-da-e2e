/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows, first row is header
  // Each card: first cell is image, second cell is text (title/desc/cta if present)

  // Header row
  const headerRow = ['Cards (cards35)'];

  // Get all card containers (each immediate child div is a card)
  const cardDivs = Array.from(element.children);

  // For this source, each card is a div.utility-aspect-1x1 containing an img
  // There is no text content in the cards, so second cell will be empty
  const rows = cardDivs.map((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    // Defensive: If no img, skip this card
    if (!img) return null;
    // No text content in this source, so second cell is empty string
    return [img, ''];
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

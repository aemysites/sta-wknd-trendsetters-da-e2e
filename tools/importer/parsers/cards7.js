/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: extract each card's image into a table row
  // Header row
  const headerRow = ['Cards (cards7)'];

  // Find all card containers (each immediate child of the grid)
  const cardDivs = Array.from(element.children);

  // For each card, extract the image element ONLY (no text content)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Only one cell per row: the image
    return [img];
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

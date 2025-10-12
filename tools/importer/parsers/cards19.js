/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block parsing
  // Header row
  const headerRow = ['Cards (cards19)'];

  // Find all card elements (each direct child div of the grid container)
  const cardDivs = Array.from(element.children);

  // Build rows for each card
  const rows = cardDivs.map(card => {
    // Icon: find the .icon img inside the card
    const iconDiv = card.querySelector('.icon');
    let iconImg = iconDiv ? iconDiv.querySelector('img') : null;
    // Defensive: If iconDiv/img not found, fallback to null
    // Text: find the first <p> inside the card
    const textP = card.querySelector('p');
    // Defensive: If no <p> found, fallback to empty string
    return [
      iconImg || '',
      textP || ''
    ];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with new block table
  element.replaceWith(block);
}

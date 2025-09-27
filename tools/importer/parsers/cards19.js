/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards19)'];

  // Get all immediate card children (each card is a direct child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build table rows for each card
  const rows = Array.from(cardDivs).map(card => {
    // Icon cell: find the first <img> inside the card
    let iconImg = null;
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Defensive: if no icon found, leave cell empty
    const iconCell = iconImg ? iconImg : '';

    // Text cell: find the <p> inside the card
    const textP = card.querySelector('p');
    // Defensive: if no <p> found, leave cell empty
    const textCell = textP ? textP : '';

    return [iconCell, textCell];
  });

  // Compose final table data
  const tableData = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

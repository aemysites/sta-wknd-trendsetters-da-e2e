/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows, each row = [image, text]
  // Header row as required
  const headerRow = ['Cards (cards7)'];

  // Find all card containers (each is a div.utility-aspect-1x1)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // For this source, each card only has an image, no text content
  // Per block description, if no text, leave second cell empty
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (img) {
      return [img, '']; // Always two columns: image, empty text
    }
    return null;
  }).filter(Boolean);

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Header row as per block name
  const headerRow = ['Cards (cards7)'];

  // Each card is a child div of the grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each card row must have two columns: image and text (text is empty if not present)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    const imageCell = img || '';
    // No text content in the HTML, but must include the empty cell for correct structure
    return [imageCell, ''];
  });

  // Compose table: header row, then card rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}

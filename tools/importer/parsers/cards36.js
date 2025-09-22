/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: one cell with block name, one empty cell to match data columns
  const headerRow = ['Cards (cards36)', ''];

  // Get all direct child divs (each card container)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows: image in first cell, alt text in second cell (text content is mandatory)
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (img) {
      // Use alt text as the text content for the card (fallback to empty string)
      const textContent = img.getAttribute('alt') || '';
      return [img, textContent];
    }
    return null;
  }).filter(Boolean);

  // Compose the table data: header row (2 cols), then all card rows (2 cols)
  const tableData = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: must be exactly one column
  const headerRow = ['Cards (cards7)'];

  // Get all direct children (each is a card container)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, extract the image (first child img in each card div)
  const cardRows = cardDivs.map(cardDiv => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // First cell: image
    const imgCell = img.cloneNode(true);
    // Second cell: text content (use alt text as heading if present)
    const textCell = document.createElement('div');
    const altText = img.getAttribute('alt') || '';
    if (altText) {
      const heading = document.createElement('h3');
      heading.textContent = altText;
      textCell.appendChild(heading);
    }
    // No additional description available in source HTML, so only heading
    return [imgCell, textCell];
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...cardRows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must have exactly one column
  const headerRow = ['Cards (cards35)'];

  // Get all immediate children (each card is a div)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;

    // Use alt text as the card title if available
    let textCell;
    if (img.alt && img.alt.trim()) {
      const heading = document.createElement('h3');
      heading.textContent = img.alt;
      textCell = heading;
    } else {
      // If no alt, try to get all text content from the cardDiv
      const text = cardDiv.textContent.trim();
      textCell = text ? text : '';
    }
    // If there is other text content in the cardDiv, add it as description
    // (for this HTML, there is none, but this makes it more flexible)
    return [img, textCell];
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards35)'];

  // Get all immediate child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare card rows: always 2 columns (image, text)
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // Only include the image in the first cell, and do not add a second cell if there is no text
    // But, to match block requirements, always include two columns: image and empty string for text
    return [img, ''];
  });

  // Compose the table data: header + card rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

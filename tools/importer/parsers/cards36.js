/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Cards (cards36)'];

  // Get all immediate children (each is a card container with an image)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build table rows: each row is [image, text content] (text content is empty since none exists)
  const rows = cardDivs.map(div => {
    const img = div.querySelector('img');
    if (img) {
      // There is no text content for these cards, so use an empty string for the second column
      return [img, ''];
    }
    return null;
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

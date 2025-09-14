/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards33)'];

  // Get all immediate child <a> elements (each card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build rows for each card
  const rows = cards.map(card => {
    // Find the image (first img inside the card)
    const img = card.querySelector('img');

    // Find the text content container (the div after the image)
    const contentDiv = card.querySelector('div > div:last-child');
    // Defensive: fallback to the last div if above fails
    const textContainer = contentDiv || card.querySelectorAll('div')[card.querySelectorAll('div').length - 1];

    // Compose the row: [image, text content]
    return [img, textContainer];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header row
  const headerRow = ['Cards (cards36)'];

  // Get all immediate child divs (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare rows for each card
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Only include the image in the first cell, and an empty string in the second cell
    return [img, ''];
  }).filter(row => row); // Only rows with an image

  // Compose the final table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

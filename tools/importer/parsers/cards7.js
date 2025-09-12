/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Cards (cards7)'];

  // Get all card containers (each card is a div.utility-aspect-1x1)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each card row must have two columns: image and text (text is mandatory, but if none exists, use a single space)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Second cell: single space to avoid empty column
    return [img, ' '];
  }).filter(Boolean);

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

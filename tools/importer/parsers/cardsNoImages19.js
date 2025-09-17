/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cardsNoImages19)'];

  // Get all immediate card children (each card is a flex-horizontal div)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only include divs that contain a <p> (the card text)
  const rows = cardDivs
    .map(cardDiv => {
      // Find the paragraph inside the card
      const p = cardDiv.querySelector('p');
      if (!p) return null;
      // Optionally, include the icon SVG (if present)
      const iconDiv = cardDiv.querySelector('.icon');
      // Compose cell: icon (if present) + paragraph
      if (iconDiv) {
        return [[iconDiv, p]];
      }
      return [p];
    })
    .filter(Boolean);

  // Compose the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

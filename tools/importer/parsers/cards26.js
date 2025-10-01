/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card container
  function extractCardInfo(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find heading (h3) and paragraph (p) if present
    const h3 = cardDiv.querySelector('h3');
    const p = cardDiv.querySelector('p');
    // Compose the text cell content
    const textContent = [];
    if (h3) textContent.push(h3);
    if (p) textContent.push(p);
    return [img, textContent];
  }

  // Get all direct children of the grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build rows for the table
  const rows = [];
  // Always use the required block name as header
  const headerRow = ['Cards (cards26)'];
  rows.push(headerRow);

  // Only include cards that have both image and text content
  cardDivs.forEach((cardDiv) => {
    // Defensive: Only include if there's an image
    const img = cardDiv.querySelector('img');
    // Check if there's a heading or paragraph
    const h3 = cardDiv.querySelector('h3');
    const p = cardDiv.querySelector('p');
    if (img && (h3 || p)) {
      rows.push(extractCardInfo(cardDiv));
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

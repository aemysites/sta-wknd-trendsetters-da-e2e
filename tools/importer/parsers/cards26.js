/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card container
  function extractCardContent(cardDiv) {
    // Find the first image in the card (mandatory)
    const img = cardDiv.querySelector('img');
    // Find heading (h3) and paragraph (p) if present
    const heading = cardDiv.querySelector('h3');
    const description = cardDiv.querySelector('p');
    // Compose the text cell: heading (if any), then description (if any)
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    // Defensive: if neither, add nothing
    return [img, textCell.length ? textCell : ''];
  }

  // Get all direct children of the grid container
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Prepare rows for the table
  const rows = [];
  // Header row as required
  rows.push(['Cards (cards26)']);

  // Iterate through each card div
  cardDivs.forEach((cardDiv) => {
    // If the card contains both image and text (h3 or p)
    if (cardDiv.querySelector('img') && (cardDiv.querySelector('h3') || cardDiv.querySelector('p'))) {
      rows.push(extractCardContent(cardDiv));
    } else if (cardDiv.querySelector('img')) {
      // Card with only image (no text)
      rows.push([cardDiv.querySelector('img'), '']);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block
  element.replaceWith(block);
}

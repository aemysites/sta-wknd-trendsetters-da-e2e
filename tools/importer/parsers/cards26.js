/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card-like div
  function extractCard(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find heading and paragraph (if present)
    let heading = null;
    let description = null;
    // Look for a container with text
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem, .utility-position-relative') || cardDiv;
    heading = textContainer.querySelector('h3');
    description = textContainer.querySelector('p');
    // Compose the text cell
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    return [img, cellContent];
  }

  // Get all immediate children (cards/images)
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Always start with the header row
  const headerRow = ['Cards (cards26)'];
  rows.push(headerRow);

  // For each card/image div
  cards.forEach((cardDiv) => {
    // Only process if it contains an image
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image
    // If it has text content, treat as a card
    const hasText = cardDiv.querySelector('h3, p');
    if (hasText) {
      rows.push(extractCard(cardDiv));
    } else {
      // If only image, create a row with image and empty cell
      rows.push([img, '']);
    }
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

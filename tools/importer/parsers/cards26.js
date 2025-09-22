/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from card div
  function extractCardContent(cardDiv) {
    // Find the first img in the card
    const img = cardDiv.querySelector('img');
    // Find the text container (may be nested)
    let textContainer = null;
    // Look for .utility-padding-all-2rem or .utility-position-relative
    textContainer = cardDiv.querySelector('.utility-padding-all-2rem') || cardDiv.querySelector('.utility-position-relative');
    // If not found, fallback to direct children
    if (!textContainer) {
      // Sometimes there is no text, just the image
      textContainer = document.createElement('div');
    }
    return [img, textContainer];
  }

  // Get all direct children divs (each is a card or image)
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Build rows for cards with both image and text
  const rows = [];
  for (const cardDiv of cards) {
    // Only include cards that have an img
    const img = cardDiv.querySelector('img');
    if (!img) continue;
    // Try to find a text container
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      // Sometimes text is inside .utility-position-relative
      textContainer = cardDiv.querySelector('.utility-position-relative');
      // If still not found, just use an empty div
      if (!textContainer) {
        textContainer = document.createElement('div');
      }
    }
    // Only include cards with either a heading or paragraph
    if (
      textContainer.querySelector('h3, h2, h1, p') ||
      textContainer.textContent.trim().length > 0
    ) {
      rows.push([img, textContainer]);
    }
  }

  // Table header
  const headerRow = ['Cards (cards26)'];
  const tableCells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}

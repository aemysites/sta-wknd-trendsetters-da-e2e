/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card root
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find the first heading and paragraph in the card
    let heading = cardDiv.querySelector('h3, h2, h4, h5, h6');
    let paragraph = cardDiv.querySelector('p');

    // Defensive: If no heading or paragraph, check for text nodes
    if (!heading && !paragraph) {
      // Sometimes the card may only have an image
      return [img, ''];
    }

    // Build text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (paragraph) textCell.appendChild(paragraph);
    return [img, textCell];
  }

  // Get all immediate children (cards) of the grid container
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Build table rows
  const rows = [];
  const headerRow = ['Cards (cards26)'];
  rows.push(headerRow);

  cards.forEach((cardDiv) => {
    // If the card has an image and text content, treat as a card
    const img = cardDiv.querySelector('img');
    const hasText = cardDiv.querySelector('h3, h2, h4, h5, h6, p');
    if (img && hasText) {
      rows.push(extractCardContent(cardDiv));
    } else if (img) {
      // If only image (no text), still add as a card with empty text cell
      rows.push([img, '']);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

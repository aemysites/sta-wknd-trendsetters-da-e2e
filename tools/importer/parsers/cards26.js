/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card div
  function extractCardContent(cardDiv) {
    // Find the first img element
    const img = cardDiv.querySelector('img');
    // Find the text container (may be nested)
    let textContainer = null;
    // Try to find a div with .utility-padding-all-2rem (contains h3+p)
    textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    // If not found, try .utility-position-relative
    if (!textContainer) {
      textContainer = cardDiv.querySelector('.utility-position-relative');
    }
    // If not found, fallback to the cardDiv itself
    if (!textContainer) {
      textContainer = cardDiv;
    }
    // Compose the text cell: prefer h3 + p, else all text
    let textCell = [];
    const h3 = textContainer.querySelector('h3');
    const p = textContainer.querySelector('p');
    if (h3 && p) {
      textCell = [h3, p];
    } else if (h3) {
      textCell = [h3];
    } else if (p) {
      textCell = [p];
    } else {
      // If no h3/p, use all text nodes
      textCell = [document.createTextNode(textContainer.textContent.trim())];
    }
    return [img, textCell];
  }

  // Get all direct children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Table header
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // For each card, build a row
  cards.forEach((cardDiv) => {
    // Only process cards with an image
    const img = cardDiv.querySelector('img');
    if (img) {
      const [imageCell, textCell] = extractCardContent(cardDiv);
      rows.push([imageCell, textCell]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

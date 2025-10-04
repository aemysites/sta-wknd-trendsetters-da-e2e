/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card element
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');

    // Find the text container (may be nested)
    let textContainer = null;
    // Look for .utility-padding-all-2rem inside cardDiv
    textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    // If not found, look for .utility-position-relative
    if (!textContainer) {
      textContainer = cardDiv.querySelector('.utility-position-relative');
    }
    // If still not found, fallback to cardDiv itself
    if (!textContainer) {
      textContainer = cardDiv;
    }

    // Compose text cell: heading + description (if present)
    let textElements = [];
    const heading = textContainer.querySelector('h3');
    if (heading) textElements.push(heading);
    const desc = textContainer.querySelector('p');
    if (desc) textElements.push(desc);
    // If no heading/desc, but text exists, add it
    if (textElements.length === 0) {
      // Get all text nodes (excluding script/style)
      Array.from(textContainer.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textElements.push(p);
        }
      });
    }
    // If nothing, fallback to empty string
    if (textElements.length === 0) textElements = [''];

    return [img, textElements];
  }

  // Get all direct children of the grid
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Table header
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // For each card, build a row [image, text]
  cards.forEach((cardDiv) => {
    // Defensive: only process if there's an image
    const img = cardDiv.querySelector('img');
    if (img) {
      const [imageCell, textCell] = extractCardContent(cardDiv);
      rows.push([imageCell, textCell]);
    }
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

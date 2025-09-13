/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card container
  function extractCardContent(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the text container (may be nested)
    let textContainer = null;
    // Look for a div with padding or relative positioning
    textContainer = cardEl.querySelector('.utility-padding-all-2rem, .utility-position-relative');
    // If not found, fallback to any div
    if (!textContainer) {
      textContainer = cardEl.querySelector('div');
    }
    // Defensive: If textContainer is a wrapper, get its first child div
    if (textContainer && textContainer.children.length === 1 && textContainer.firstElementChild.tagName === 'DIV') {
      textContainer = textContainer.firstElementChild;
    }
    // If no textContainer, create an empty div
    if (!textContainer) {
      textContainer = document.createElement('div');
    }
    return [img, textContainer];
  }

  // Get all immediate children (cards)
  const cardNodes = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Header row
  rows.push(['Cards (cards25)']);

  // For each card, extract image and text
  cardNodes.forEach(cardEl => {
    // Defensive: Only process if there's an image
    const img = cardEl.querySelector('img');
    if (img) {
      const [imageEl, textEl] = extractCardContent(cardEl);
      rows.push([imageEl, textEl]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

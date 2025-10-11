/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card element
  function extractCardContent(cardEl) {
    // Find the first image in the card
    const img = cardEl.querySelector('img');

    // Find all possible text content inside the card
    // Try .utility-padding-all-2rem first, but fallback to any h3/p in cardEl
    let textFragments = [];
    const contentContainers = [
      ...cardEl.querySelectorAll('.utility-padding-all-2rem'),
      cardEl // fallback to cardEl itself
    ];
    for (const container of contentContainers) {
      const headings = Array.from(container.querySelectorAll('h3'));
      const paragraphs = Array.from(container.querySelectorAll('p'));
      if (headings.length > 0 || paragraphs.length > 0) {
        textFragments = [...headings, ...paragraphs];
        break;
      }
    }
    // If nothing found, use the image alt as fallback text content (not empty)
    if (textFragments.length === 0 && img && img.alt) {
      textFragments = [document.createTextNode(img.alt)];
    }
    // If still nothing, fallback to empty string
    if (textFragments.length === 0) {
      textFragments = [''];
    }
    return [img, textFragments];
  }

  // Find all immediate children of the grid container
  const cardElements = Array.from(element.children);

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards26)']);

  // For each card element, create a row
  cardElements.forEach(cardEl => {
    // Only process elements that have an image
    const img = cardEl.querySelector('img');
    if (!img) return;
    const [imageCell, textCell] = extractCardContent(cardEl);
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

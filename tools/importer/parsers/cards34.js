/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find text container (mandatory)
    // It's the div after the image
    const gridDivs = cardEl.querySelectorAll(':scope > div');
    let textContainer;
    if (gridDivs.length > 0) {
      // If there is a grid div, use it
      textContainer = gridDivs[0];
    } else {
      // Fallback: use the first div after img
      textContainer = img ? img.nextElementSibling : null;
    }
    // Defensive: if missing, skip
    if (!img || !textContainer) return null;
    // Compose text cell
    // We'll include everything in the textContainer, preserving structure
    // This includes tag, time, heading, paragraph, and CTA
    return [img, textContainer];
  }

  // Get all cards (anchors)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  // Compose table rows
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];
  cards.forEach(cardEl => {
    const cardInfo = extractCardInfo(cardEl);
    if (cardInfo) {
      rows.push(cardInfo);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}

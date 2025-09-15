/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a grid child
  function extractCardContent(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the text content (title and description)
    let title = null;
    let desc = null;
    // Defensive: Some cards have text inside nested divs
    const heading = cardEl.querySelector('h3, h2, h4');
    if (heading) {
      title = heading;
    }
    const para = cardEl.querySelector('p');
    if (para) {
      desc = para;
    }
    // Compose text cell content
    const textContent = [];
    if (title) textContent.push(title);
    if (desc) textContent.push(desc);
    // If no text, fallback to empty string
    return [img, textContent.length ? textContent : ''];
  }

  // Get all direct children of the grid
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Compose table rows
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  cards.forEach(cardEl => {
    // Only process if there's an image
    const img = cardEl.querySelector('img');
    if (!img) return; // skip non-card blocks
    rows.push(extractCardContent(cardEl));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

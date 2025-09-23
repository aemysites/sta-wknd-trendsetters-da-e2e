/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card element
  function extractCardInfo(cardDiv) {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text content (title and description)
    let title = null;
    let desc = null;
    // Look for a heading (h3, h2, h1)
    title = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');
    // Look for a paragraph
    desc = cardDiv.querySelector('p');
    // Compose text cell content
    const textContent = [];
    if (title) textContent.push(title);
    if (desc) textContent.push(desc);
    return [img, textContent];
  }

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards26)']);

  // Get all immediate children (cards or images)
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  for (const cardDiv of cards) {
    // If it has an image and text, treat as card
    const img = cardDiv.querySelector('img');
    const hasHeading = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');
    const hasParagraph = cardDiv.querySelector('p');
    if (img && (hasHeading || hasParagraph)) {
      // Card with image and text
      const [imageEl, textEls] = extractCardInfo(cardDiv);
      rows.push([
        imageEl,
        textEls
      ]);
    } else if (img) {
      // Image only card (no text)
      rows.push([
        img,
        ''
      ]);
    }
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

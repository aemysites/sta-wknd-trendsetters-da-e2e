/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content (image, title, description) from a card element
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find heading (h3) and paragraph if present
    const heading = cardDiv.querySelector('h3, h2, h4, h5, h6');
    const paragraph = cardDiv.querySelector('p');

    // Compose the text cell: heading (if any), then paragraph (if any)
    const textCell = [];
    if (heading) textCell.push(heading);
    if (paragraph) textCell.push(paragraph);
    // If neither, fallback to all text nodes
    if (textCell.length === 0) {
      // Collect all text nodes
      const text = cardDiv.textContent.trim();
      if (text) textCell.push(document.createTextNode(text));
    }
    return [img, textCell];
  }

  // Get all immediate children (cards) of the grid container
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Always use the required block name as header
  const headerRow = ['Cards (cards26)'];
  rows.push(headerRow);

  // For each card, extract image and text content
  cards.forEach((cardDiv) => {
    // Defensive: skip if no image
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Use helper to get [image, [heading, paragraph]]
    const [imageEl, textContent] = extractCardContent(cardDiv);
    rows.push([imageEl, textContent]);
  });

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

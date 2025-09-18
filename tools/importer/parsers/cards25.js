/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card-like div
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find heading and paragraph (if any)
    let textContent = [];
    // Try to find the content wrapper (for cards with text)
    let contentWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    if (contentWrapper) {
      // Gather all children (should be h3 and p)
      Array.from(contentWrapper.children).forEach(child => {
        textContent.push(child);
      });
    }
    // If no content wrapper, leave textContent empty
    return [img, textContent.length ? textContent : ''];
  }

  // Get all immediate children (cards) of the grid
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  for (const cardDiv of cardDivs) {
    // Only process if it contains an image
    const img = cardDiv.querySelector('img');
    if (!img) continue; // skip non-card images
    const [imageEl, textEls] = extractCardContent(cardDiv);
    // Only add rows with an image (mandatory)
    rows.push([imageEl, textEls]);
  }

  // Build the table: header row, then one row per card
  const tableRows = [
    ['Cards (cards25)'],
    ...rows
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract title and description from a card div
  function extractTextContent(cardDiv) {
    // Try to find the text wrapper
    const textWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textWrapper) {
      // Find heading (h3) and description (p)
      const heading = textWrapper.querySelector('h3');
      const description = textWrapper.querySelector('p');
      // Compose content: heading (if exists), then description (if exists)
      const content = [];
      if (heading) content.push(heading);
      if (description) content.push(description);
      return content;
    }
    return [];
  }

  // Get all direct children (cards) of the grid
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Build table rows
  const rows = [];
  // Header row as required
  const headerRow = ['Cards (cards26)'];
  rows.push(headerRow);

  cards.forEach((cardDiv) => {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Defensive: skip if no image
    if (!img) return;
    // Extract text content (title, description)
    const textContent = extractTextContent(cardDiv);
    // If no text, use an empty string
    const textCell = textContent.length > 0 ? textContent : '';
    rows.push([img, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

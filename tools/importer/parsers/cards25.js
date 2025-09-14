/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(cardDiv) {
    // Find the image (first img in card)
    const img = cardDiv.querySelector('img');
    // Find heading and paragraph (if present)
    let heading = null;
    let description = null;
    const contentWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    if (contentWrapper) {
      heading = contentWrapper.querySelector('h3, h2, h4, h1');
      description = contentWrapper.querySelector('p');
    }
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    // Defensive: if no heading/description, leave cell empty
    return [img, textCell.length ? textCell : ''];
  }

  // Get all direct children that are cards (those with both img and text)
  const cardRows = [];
  const children = Array.from(element.children);
  children.forEach((child) => {
    // Only process if there's an image
    const img = child.querySelector('img');
    // Only process if there's a heading or description
    const hasText = child.querySelector('h3, h2, h4, h1, p');
    if (img && hasText) {
      cardRows.push(extractCardContent(child));
    }
  });

  // Build table rows
  const cells = [
    ['Cards (cards25)'], // Header row
    ...cardRows
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

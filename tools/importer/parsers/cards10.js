/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, multiple rows
  // Each card: image (left), text content (right)

  // Header row for the block
  const headerRow = ['Cards (cards10)'];

  // Find all card elements (anchor tags with class 'card-link')
  const cardSelector = 'a.card-link';
  const cards = Array.from(element.querySelectorAll(cardSelector));

  // Defensive: If no cards found, do nothing
  if (!cards.length) return;

  // Helper to extract card content
  function extractCardContent(card) {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }

    // Text content: second child div
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    let textContentEls = [];
    if (textDiv) {
      // Tag (optional)
      const tagEl = textDiv.querySelector('.tag');
      if (tagEl) textContentEls.push(tagEl);
      // Heading (h3)
      const headingEl = textDiv.querySelector('h3');
      if (headingEl) textContentEls.push(headingEl);
      // Description (p)
      const descEl = textDiv.querySelector('p');
      if (descEl) textContentEls.push(descEl);
    }
    return [imageEl, textContentEls];
  }

  // Build table rows for each card
  const rows = cards.map(card => {
    const [imageEl, textContentEls] = extractCardContent(card);
    return [imageEl, textContentEls];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

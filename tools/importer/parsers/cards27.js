/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card wrapper
  function extractCard(cardDiv) {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text content (title and description)
    let title = null;
    let desc = null;
    // Find the wrapper that contains text
    const textWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textWrapper) {
      title = textWrapper.querySelector('h3');
      desc = textWrapper.querySelector('p');
    }
    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    // Defensive fallback: if no wrapper, try direct children
    if (!title && !desc) {
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3) textCell.push(h3);
      if (p) textCell.push(p);
    }
    // Always include image in first cell
    return [img, textCell];
  }

  // Get all immediate children of the grid
  const cards = [];
  const children = element.querySelectorAll(':scope > div');
  children.forEach((child) => {
    // Only process cards with both image and text
    const hasImg = child.querySelector('img');
    const hasText = child.querySelector('h3') || child.querySelector('p');
    if (hasImg && hasText) {
      cards.push(extractCard(child));
    }
  });

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards27)']);
  // Card rows
  cards.forEach(card => {
    rows.push(card);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

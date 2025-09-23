/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each card anchor
  function extractCardContent(cardAnchor) {
    // Find the image (first img in the card)
    const img = cardAnchor.querySelector('img');

    // Find the card content container (the div after the image)
    const contentDiv = Array.from(cardAnchor.children).find(
      (child) => child.tagName === 'DIV'
    );

    // Defensive: If contentDiv not found, fallback to anchor itself
    const contentScope = contentDiv || cardAnchor;

    // Collect all elements that are not the image
    // We'll include all elements after the image for flexibility
    const textContent = [];
    let foundImg = false;
    Array.from(cardAnchor.children).forEach((child) => {
      if (foundImg) {
        textContent.push(child);
      }
      if (child === img) {
        foundImg = true;
      }
    });
    // If nothing was found after the image, fallback to contentDiv
    if (textContent.length === 0 && contentDiv) {
      textContent.push(contentDiv);
    }

    return [img, textContent];
  }

  // Get all card anchors (direct children)
  const cardAnchors = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards34)'];
  rows.push(headerRow);

  // Card rows
  cardAnchors.forEach((anchor) => {
    rows.push(extractCardContent(anchor));
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card anchor
  function extractCardContent(cardAnchor) {
    // Image: find first img inside the anchor (may be inside a div)
    const img = cardAnchor.querySelector('img');
    // Text content: collect all direct children except images
    const textContent = document.createElement('div');
    // Collect all direct children except images
    Array.from(cardAnchor.children).forEach((child) => {
      if (!child.querySelector('img') && child.tagName !== 'IMG') {
        textContent.appendChild(child.cloneNode(true));
      }
    });
    // Defensive: only include cards with at least one image and some text
    if (!img || !textContent.textContent.trim()) return null;
    return [img, textContent];
  }

  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all anchors inside grid (cards with images)
  const cardAnchors = Array.from(grid.querySelectorAll('a.utility-link-content-block'));
  const rows = [];
  cardAnchors.forEach((anchor) => {
    const card = extractCardContent(anchor);
    if (card) rows.push(card);
  });

  // Table header
  const headerRow = ['Cards (cards37)'];
  const tableRows = [headerRow];
  // For each row, ensure 2 columns: [image, text content]
  rows.forEach(([img, textContent]) => {
    tableRows.push([
      img,
      textContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

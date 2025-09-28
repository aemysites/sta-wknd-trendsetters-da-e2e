/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card anchor or block
  function extractCardContent(cardEl) {
    // Find image (mandatory)
    let img = cardEl.querySelector('img');
    if (!img) img = cardEl.querySelector('picture img');
    // Only include cards with an image (mandatory for this block)
    if (!img) return null;

    // Compose text cell: include all text content (not just heading/tag/desc)
    const textContent = document.createElement('div');
    // Copy all elements except images
    Array.from(cardEl.childNodes).forEach((node) => {
      if (node.nodeType === 1 && node.tagName === 'IMG') return;
      // If element, clone it
      if (node.nodeType === 1) {
        textContent.appendChild(node.cloneNode(true));
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        // If text node, add as paragraph
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textContent.appendChild(p);
      }
    });
    return [img, textContent];
  }

  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const rows = [];
  // Header row
  rows.push(['Cards (cards36)']);

  // Collect all card anchors in grid and flex groups
  const cardAnchors = [
    ...grid.querySelectorAll('a.utility-link-content-block'),
  ];

  cardAnchors.forEach((card) => {
    const cardRow = extractCardContent(card);
    if (cardRow) rows.push(cardRow); // Only push cards with images
  });

  // Also handle cards without images (text-only cards, e.g. in flex groups)
  // Find flex groups with text-only cards
  const flexGroups = grid.querySelectorAll('.flex-horizontal');
  flexGroups.forEach((flex) => {
    flex.querySelectorAll('a.utility-link-content-block').forEach((card) => {
      if (!card.querySelector('img')) {
        // Text-only card
        const textContent = document.createElement('div');
        Array.from(card.childNodes).forEach((node) => {
          if (node.nodeType === 1) {
            textContent.appendChild(node.cloneNode(true));
          } else if (node.nodeType === 3 && node.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            textContent.appendChild(p);
          }
        });
        rows.push(['', textContent]);
      }
    });
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

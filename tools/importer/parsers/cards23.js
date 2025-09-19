/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Helper to extract image and all text from a card anchor
  function extractCardContent(card) {
    // Find image
    const img = card.querySelector('img');
    // Collect all text content (headings, paragraphs, etc.)
    const textCell = document.createElement('div');
    // Get all heading elements inside the card
    card.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      textCell.appendChild(h.cloneNode(true));
    });
    // Get all paragraph and description elements inside the card
    card.querySelectorAll('.paragraph-sm, p').forEach(p => {
      textCell.appendChild(p.cloneNode(true));
    });
    // Defensive: fallback to all text nodes if nothing found
    if (!textCell.childNodes.length) {
      textCell.textContent = card.textContent.trim();
    }
    return [img, textCell];
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach(tabPane => {
    // Find the grid inside the tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a>
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach(card => {
      const [img, textCell] = extractCardContent(card);
      if (img && textCell.textContent.trim()) {
        rows.push([img, textCell]);
      }
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

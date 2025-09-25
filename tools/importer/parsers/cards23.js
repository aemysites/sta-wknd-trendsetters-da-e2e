/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and all text from a card anchor
  function extractCardContent(card) {
    // Find image (mandatory)
    const img = card.querySelector('img');
    if (!img) return null; // Skip cards without image
    // Find all text content (not just heading and desc)
    // Collect all direct children that are not images
    const textElements = [];
    card.childNodes.forEach(node => {
      if (node.nodeType === 1 && node.tagName !== 'DIV' && node.tagName !== 'IMG') {
        textElements.push(node);
      }
      // Also include divs that may contain text
      if (node.nodeType === 1 && node.tagName === 'DIV') {
        textElements.push(node);
      }
    });
    // If no direct children, fallback to all text content
    if (textElements.length === 0) {
      textElements.push(document.createTextNode(card.textContent.trim()));
    }
    return [img, textElements.length ? textElements : ''];
  }

  // Find all tab panes (each tab has a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];
  const headerRow = ['Cards (cards23)'];
  rows.push(headerRow);

  tabPanes.forEach(tabPane => {
    // Find the grid inside this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a>
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach(card => {
      const content = extractCardContent(card);
      if (content) rows.push(content);
    });
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

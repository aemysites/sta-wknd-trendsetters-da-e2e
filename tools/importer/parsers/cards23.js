/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card element
  function extractCardContent(card) {
    // Try to find an image anywhere inside the card
    let imgEl = card.querySelector('img');
    // For text: get all text content except the image
    // We'll clone the card, remove the image, and use the rest as the text cell
    const cardClone = card.cloneNode(true);
    const imgClone = cardClone.querySelector('img');
    if (imgClone) imgClone.remove();
    // Remove empty wrappers if any
    function cleanEmptyNodes(node) {
      if (!node.hasChildNodes()) return;
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === 1) {
          cleanEmptyNodes(child);
          if (!child.textContent.trim() && !child.querySelector('img')) {
            child.remove();
          }
        }
      });
    }
    cleanEmptyNodes(cardClone);
    return [imgEl, cardClone];
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  const rows = [];
  // Always start with the block header
  const headerRow = ['Cards (cards23)'];
  rows.push(headerRow);

  tabPanes.forEach(tabPane => {
    // Find all card links inside the grid layout
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Only direct children that are cards
    const cards = Array.from(grid.children).filter(child => child.tagName === 'A');
    cards.forEach(card => {
      const [imgEl, textContent] = extractCardContent(card);
      // Only include cards with an image and text
      if (!imgEl || !textContent.textContent.trim()) return;
      rows.push([imgEl, textContent]);
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}

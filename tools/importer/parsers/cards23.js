/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Helper to extract image from a card element (if present)
  function getImage(card) {
    // Look for an img inside the card
    const img = card.querySelector('img');
    return img || '';
  }

  // Helper to extract text content (title + description) from a card element
  function getTextContent(card) {
    const content = [];
    // Find heading (h3) and description (div.paragraph-sm)
    const heading = card.querySelector('h3');
    const desc = card.querySelector('.paragraph-sm');
    if (heading) {
      // Use the actual heading element, not just text
      content.push(heading);
    }
    if (desc) {
      content.push(desc);
    }
    return content.length ? content : '';
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Find the grid inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Image cell
      const img = getImage(card);
      // Text cell
      const textContent = getTextContent(card);
      // Only add if there is at least an image or text
      if (img || textContent) {
        rows.push([
          img,
          textContent
        ]);
      }
    });
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

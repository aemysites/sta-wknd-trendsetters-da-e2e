/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid layout
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Only direct children that are <a> tags (each card)
    const cardLinks = Array.from(grid.querySelectorAll(':scope > a'));
    cardLinks.forEach((cardLink) => {
      let imgEl = cardLink.querySelector('img');
      // Defensive: Some cards may not have images
      if (!imgEl) {
        // If no image, use a default icon placeholder
        const icon = document.createElement('span');
        icon.textContent = '[icon]';
        imgEl = icon;
      }
      // Title: look for h3 inside card
      const titleEl = cardLink.querySelector('h3');
      // Description: look for .paragraph-sm inside card
      const descEl = cardLink.querySelector('.paragraph-sm');
      // Compose text cell: title (heading) above description
      const textCell = [];
      if (titleEl) textCell.push(titleEl);
      if (descEl) textCell.push(descEl);
      // Compose row: [image/icon, text]
      cards.push([
        imgEl,
        textCell.length ? textCell : '',
      ]);
    });
    return cards;
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Header row as per block spec
  rows.push(['Cards (cards23)']);

  tabPanes.forEach((tabPane) => {
    // Each tabPane contains a grid of cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cardRows = extractCardsFromGrid(grid);
      rows.push(...cardRows);
    }
  });

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

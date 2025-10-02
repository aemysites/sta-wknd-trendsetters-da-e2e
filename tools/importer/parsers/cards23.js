/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract cards from a grid container
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Each card is an <a> inside the grid
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach((cardLink) => {
      // Try to get image (if present)
      let img = cardLink.querySelector('img');
      // Try to get heading (h3)
      let heading = cardLink.querySelector('h3');
      // Try to get description (div.paragraph-sm)
      let desc = cardLink.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      cards.push([
        img || '',
        textCell.length ? textCell : ''
      ]);
    });
    return cards;
  }

  // Find all tab panes (each has a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const allCards = [];
  tabPanes.forEach((tabPane) => {
    // Each tab pane has a grid
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      allCards.push(...cards);
    }
  });

  // Table header
  const headerRow = ['Cards (cards23)'];
  // Compose table rows: header + all cards
  const tableRows = [headerRow, ...allCards];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Each card is an <a> (with or without an image)
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach((cardLink) => {
      // Find image (if present)
      let img = cardLink.querySelector('img');
      // Find title (h3 or h4)
      let heading = cardLink.querySelector('h3, h4');
      // Find description (div with class paragraph-sm)
      let desc = cardLink.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      cards.push([
        img || '',
        textCell.length > 0 ? textCell : ''
      ]);
    });
    return cards;
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  let allCards = [];
  tabPanes.forEach((tabPane) => {
    // Each tabPane has a grid
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      allCards = allCards.concat(cards);
    }
  });

  // Build the table rows
  const headerRow = ['Cards (cards23)'];
  const tableRows = [headerRow, ...allCards];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}

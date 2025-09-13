/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCards(grid) {
    const cards = [];
    // Select all direct child <a> elements (each card)
    const cardEls = Array.from(grid.querySelectorAll(':scope > a'));
    cardEls.forEach(cardEl => {
      let imgEl = cardEl.querySelector('img');
      // Defensive: some cards may not have an image
      let imageCell = imgEl ? imgEl : '';
      // Text cell: collect heading and paragraph
      let heading = cardEl.querySelector('h3');
      let desc = cardEl.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      cards.push([imageCell, textCell]);
    });
    return cards;
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = Array.from(element.querySelectorAll(':scope > div'));
  // Collect all cards from all tabs
  let allCards = [];
  tabPanes.forEach(tabPane => {
    // Find the grid inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCards(grid);
      allCards = allCards.concat(cards);
    }
  });

  // Table header
  const headerRow = ['Cards (cards23)'];
  // Compose table rows
  const tableRows = [headerRow, ...allCards];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}

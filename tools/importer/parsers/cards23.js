/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Each card is an <a> direct child of the grid
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach((cardLink) => {
      let img = cardLink.querySelector('img');
      // Only add the image if it exists (do not use null)
      let imageEl = img || '';
      // Text content: look for heading and description
      let heading = cardLink.querySelector('h3, h2, h4, h5, h6');
      let desc = cardLink.querySelector('.paragraph-sm, p');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // If no heading or desc, fallback to cardLink.textContent
      if (textCell.length === 0) {
        textCell.push(document.createTextNode(cardLink.textContent.trim()));
      }
      cards.push([imageEl, textCell]);
    });
    return cards;
  }

  // Find all tab panes (each contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  let allCards = [];
  tabPanes.forEach((tabPane) => {
    // Find the grid inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      allCards = allCards.concat(cards);
    }
  });

  // Compose table rows
  const headerRow = ['Cards (cards23)'];
  const tableRows = [headerRow];
  allCards.forEach(([image, textContent]) => {
    tableRows.push([image, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}

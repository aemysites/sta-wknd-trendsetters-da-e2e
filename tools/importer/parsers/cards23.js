/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCards(grid) {
    const cards = [];
    // Only direct children that are links (cards)
    const cardLinks = Array.from(grid.children).filter(child => child.tagName === 'A');
    cardLinks.forEach(card => {
      // Try to find image in card
      let img = card.querySelector('img');
      // Try to find heading in card
      let heading = card.querySelector('h3, h2, h4, h5, h6');
      // Try to find description in card
      let desc = card.querySelector('.paragraph-sm, p');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Push row: [image, text]
      cards.push([
        img || '',
        textCell.length ? textCell : ''
      ]);
    });
    return cards;
  }

  // Find all tab panes (each with a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [['Cards (cards23)']];
  tabPanes.forEach(tabPane => {
    // Find the grid inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCards(grid);
      rows.push(...cards);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCards(grid) {
    const cards = [];
    // Only direct children that are <a>
    const cardLinks = Array.from(grid.querySelectorAll(':scope > a'));
    cardLinks.forEach((cardLink) => {
      let img = cardLink.querySelector('img');
      let heading = cardLink.querySelector('h3');
      let desc = cardLink.querySelector('.paragraph-sm');
      // Defensive fallback for alternate structure
      if (!img) {
        // Some cards may have the image inside a nested div
        const imgDiv = cardLink.querySelector('div img');
        if (imgDiv) img = imgDiv;
      }
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Always include image in first cell
      cards.push([
        img || '',
        textCell.length ? textCell : ''
      ]);
    });
    return cards;
  }

  // Find all tab panes (each tab pane contains a grid of cards)
  const tabPanes = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Header row as per block spec
  const headerRow = ['Cards (cards23)'];
  rows.push(headerRow);
  tabPanes.forEach((tabPane) => {
    // Each tabPane contains a grid-layout div
    const grid = tabPane.querySelector('.grid-layout');
    if (grid) {
      const cards = extractCards(grid);
      rows.push(...cards);
    }
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

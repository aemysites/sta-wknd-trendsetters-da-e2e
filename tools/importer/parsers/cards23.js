/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all cards from all tab panes into a single table, ensuring all cards are included
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    // Find the grid container inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor (a) inside the grid
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link, a.card-link-on-secondary');
    cards.forEach((card) => {
      // --- IMAGE CELL ---
      let img = card.querySelector('img');
      let imageCell = img ? img : '';
      // --- TEXT CELL ---
      let heading = card.querySelector('h3');
      let description = card.querySelector('.paragraph-sm');
      const textCellContent = [];
      if (heading) textCellContent.push(heading);
      if (description) textCellContent.push(description);
      rows.push([
        imageCell,
        textCellContent
      ]);
    });
  });

  // Create the table block with all cards from all tabs
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

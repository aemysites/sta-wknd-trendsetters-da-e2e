/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block - extract cards from ALL tab panes
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach(card => {
      // Image: look for a direct child div containing an img
      let imgDiv = card.querySelector('.utility-aspect-3x2');
      let img = imgDiv ? imgDiv.querySelector('img') : null;
      // Title: look for h3 inside the card (always present)
      let title = card.querySelector('h3');
      // Description: look for .paragraph-sm inside the card
      let desc = card.querySelector('.paragraph-sm');
      // Compose text cell: title above description
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      // Compose row: [image, text]
      rows.push([
        img ? img : '',
        textCell
      ]);
    });
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

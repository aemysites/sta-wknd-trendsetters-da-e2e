/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block parsing
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach((tabPane) => {
    // Find the grid container inside each tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all card links (each card is an anchor)
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach((card) => {
      let img = null;
      // Try to find an image inside the card
      const imgContainer = card.querySelector('.utility-aspect-3x2');
      if (imgContainer) {
        img = imgContainer.querySelector('img');
      }
      // Card text content
      let heading = card.querySelector('h3');
      let description = card.querySelector('.paragraph-sm');
      const textCell = [];
      if (heading) textCell.push(heading);
      if (description) textCell.push(description);
      rows.push([
        img ? img : '',
        textCell
      ]);
    });
  });

  // Create the block table for all tabs combined
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

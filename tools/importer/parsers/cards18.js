/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards18) block parsing
  // 1. Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  const rows = [];
  // Always start with the header row
  rows.push(['Cards (cards18)']);

  tabPanes.forEach((pane) => {
    // Each pane contains a grid of cards
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor tag
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach((card) => {
      // IMAGE: Find the image in the card (if present)
      let img = card.querySelector('img');
      // TEXT: Find the heading and description
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Compose row: [image or empty string, text]
      rows.push([
        img ? img : '',
        textCell
      ]);
    });
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

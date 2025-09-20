/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Defensive: find all tab panes (each tab is a group of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Each tabPane contains a grid of cards
    const grid = tabPane.querySelector(':scope > .w-layout-grid');
    if (!grid) return;
    // Each card is an <a> direct child of grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Find image (if present)
      let img = card.querySelector('img');
      // Defensive: some cards may not have an image
      if (!img) {
        // Some cards have image in a nested div
        const imgDiv = card.querySelector('div img');
        if (imgDiv) img = imgDiv;
      }
      // Find heading (title)
      let heading = card.querySelector('h3, h4, h2, h1');
      // Find description (paragraph)
      let desc = card.querySelector('.paragraph-sm, p');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // If there's a call-to-action (not present in this HTML), add it
      // Compose row: [image, text]
      rows.push([
        img ? img : '',
        textCell.length ? textCell : '',
      ]);
    });
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}

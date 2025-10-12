/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block parsing
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach(tabPane => {
    // Find all card containers in this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach(card => {
      let imgEl = null;
      // Try to find image inside the card
      const imgContainer = card.querySelector('.utility-aspect-3x2');
      if (imgContainer) {
        imgEl = imgContainer.querySelector('img');
      }
      // Text content: heading and description
      let textEls = [];
      const heading = card.querySelector('h3');
      if (heading) textEls.push(heading);
      // Find description (paragraph-sm)
      const desc = card.querySelector('.paragraph-sm');
      if (desc) textEls.push(desc);
      // Always push two columns: image (or empty string), text content
      rows.push([
        imgEl ? imgEl : '',
        textEls
      ]);
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

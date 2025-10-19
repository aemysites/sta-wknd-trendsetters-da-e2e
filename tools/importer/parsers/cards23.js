/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach(tabPane => {
    // Each tab pane contains a grid of cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor tag (a)
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach(card => {
      let imgEl = null;
      // Try to find an image inside the card
      const imgContainer = card.querySelector('.utility-aspect-3x2');
      if (imgContainer) {
        const img = imgContainer.querySelector('img');
        if (img) imgEl = img.cloneNode(true);
      }
      // For text content: heading + description
      let headingEl = card.querySelector('h3');
      let descEl = card.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = [];
      if (headingEl) textCell.push(headingEl.cloneNode(true));
      if (descEl) textCell.push(descEl.cloneNode(true));
      // If both heading and description are missing, skip this card
      if (!imgEl && textCell.length === 0) return;
      // Add row: [image or null, text content]
      rows.push([
        imgEl ? imgEl : '',
        textCell
      ]);
    });
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

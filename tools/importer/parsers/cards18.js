/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards18) block: 2 columns, multiple rows
  // Each card: image (or icon) in first cell, text content (title, description) in second cell

  // Find all tab panes (each tab is a set of cards)
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));
  let replaced = false;

  tabPanes.forEach((tabPane) => {
    // Prepare the table rows for this tab
    const rows = [];
    // Header row
    rows.push(['Cards (cards18)']);

    // Find the grid container within the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;

    // Find all card anchors within the grid
    // Use less specific selector to ensure all card links are included
    const cards = Array.from(grid.querySelectorAll('a'));
    if (!cards.length) return;

    cards.forEach((card) => {
      // Card image (if present)
      let imgEl = card.querySelector('img.cover-image');
      let imageCell = '';
      if (imgEl) {
        imageCell = imgEl.cloneNode(true);
      }

      // Card text content: gather all text content in the card, not just heading and desc
      let textCell = [];
      let heading = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      if (heading) textCell.push(heading.cloneNode(true));
      if (desc) textCell.push(desc.cloneNode(true));
      // If heading/desc missing, fallback to all text content (excluding image)
      if (!textCell.length) {
        let cardClone = card.cloneNode(true);
        Array.from(cardClone.querySelectorAll('img')).forEach(img => img.remove());
        let textContent = cardClone.textContent.replace(/\s+/g, ' ').trim();
        if (textContent) textCell = [textContent];
      }
      // If still empty, fallback to card.textContent
      if (!textCell.length) {
        let textContent = card.textContent.replace(/\s+/g, ' ').trim();
        if (textContent) textCell = [textContent];
      }
      rows.push([imageCell, textCell]);
    });

    // Create the table block for this tab
    const block = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the tabPane with the block
    tabPane.replaceWith(block);
    replaced = true;
  });

  // Only remove the original element if something was replaced
  if (replaced && element.parentNode) {
    element.remove();
  }
}

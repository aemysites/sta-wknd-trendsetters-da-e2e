/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach(tabPane => {
    const rows = [];
    // Header row for each block
    rows.push(['Cards (cards23)']);
    // Find grid in this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all card links in this grid
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach(card => {
      // IMAGE CELL
      let imgCell = '';
      const imgWrap = card.querySelector('.utility-aspect-3x2');
      if (imgWrap) {
        const img = imgWrap.querySelector('img');
        if (img) imgCell = img;
      }
      // TEXT CELL
      const textCellContent = [];
      const heading = card.querySelector('h3, .h4-heading');
      if (heading) textCellContent.push(heading);
      const desc = card.querySelector('.paragraph-sm');
      if (desc) textCellContent.push(desc);
      rows.push([imgCell, textCellContent]);
    });
    // Create table block for this tab
    const table = WebImporter.DOMUtils.createTable(rows, document);
    tabPane.replaceWith(table);
  });
}

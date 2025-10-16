/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Extract ALL cards from ALL tab panes (not just the first tab)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cardLinks = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cardLinks.forEach((card) => {
      // --- Image cell ---
      let imageEl = null;
      const imgContainer = card.querySelector('.utility-aspect-3x2');
      if (imgContainer) {
        imageEl = imgContainer.querySelector('img');
      }
      // --- Text cell ---
      const heading = card.querySelector('h3');
      const desc = card.querySelector('.paragraph-sm');
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      rows.push([
        imageEl || '',
        textCell
      ]);
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Defensive: Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Each tab pane contains a grid-layout div
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Try to find image (first cell)
      let img = card.querySelector('img');
      // Defensive: Some cards may not have an image
      let imageCell = img ? img : '';

      // Text cell: Heading and description
      // Some cards have a wrapper div, some don't
      let heading = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      // Compose text cell
      const textCellContent = [];
      if (heading) textCellContent.push(heading);
      if (desc) textCellContent.push(desc);
      // Defensive: If both missing, fallback to card text
      if (textCellContent.length === 0) {
        textCellContent.push(document.createTextNode(card.textContent.trim()));
      }
      rows.push([imageCell, textCellContent]);
    });
  });

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

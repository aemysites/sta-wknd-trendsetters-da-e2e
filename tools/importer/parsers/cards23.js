/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(card) {
    // Find image (if present)
    const img = card.querySelector('img');
    // Find heading (h3)
    const heading = card.querySelector('h3');
    // Find description (div.paragraph-sm)
    const desc = card.querySelector('.paragraph-sm');
    // Compose text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading.cloneNode(true));
    if (desc) textCell.appendChild(desc.cloneNode(true));
    return [img ? img.cloneNode(true) : '', textCell];
  }

  // Gather all tables to insert
  const tables = [];
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));
  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('a'));
    if (!cards.length) return;
    const headerRow = ['Cards (cards23)'];
    const rows = cards.map(extractCardContent);
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ...rows
    ], document);
    tables.push(table);
  });

  if (tables.length) {
    element.replaceWith(...tables);
  }
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Only direct children that are <a> (each card)
    const cardLinks = Array.from(grid.children).filter(child => child.tagName === 'A');
    cardLinks.forEach(card => {
      // Try to find image (first .utility-aspect-3x2 or .cover-image)
      let img = card.querySelector('img.cover-image');
      // If not found, look for a .utility-aspect-3x2 with an img inside
      if (!img) {
        const aspect = card.querySelector('.utility-aspect-3x2');
        if (aspect) img = aspect.querySelector('img');
      }
      // For text: look for h3 and description div
      let title = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      // Some cards have a double-nested structure for text
      if (!title || !desc) {
        const textWrap = card.querySelector('.utility-text-align-center');
        if (textWrap) {
          if (!title) title = textWrap.querySelector('h3');
          if (!desc) desc = textWrap.querySelector('.paragraph-sm');
        }
      }
      // Compose text cell
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      // If there is a call-to-action (not in this HTML, but for robustness)
      const cta = card.querySelector('a:not([href="#"])');
      if (cta) textCell.push(cta);
      // Compose row: [image, text]
      cards.push([
        img || '',
        textCell.length > 0 ? textCell : ''
      ]);
    });
    return cards;
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const allRows = [];
  tabPanes.forEach(tabPane => {
    // Each tabPane has a grid inside
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const rows = extractCardsFromGrid(grid);
      allRows.push(...rows);
    }
  });

  // Compose the table: header + all card rows
  const headerRow = ['Cards (cards18)'];
  const tableRows = [headerRow, ...allRows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

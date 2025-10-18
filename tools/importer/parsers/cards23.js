/* global WebImporter */
export default function parse(element, { document }) {
  // Extract each tab's cards into a separate table
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const cards = [];
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cardEls = grid.querySelectorAll('a');
      cardEls.forEach((cardEl) => {
        // Card image (if present)
        let img = cardEl.querySelector('img');
        // Card title (usually h3)
        let title = cardEl.querySelector('h3');
        // Card description (usually div.paragraph-sm)
        let desc = cardEl.querySelector('.paragraph-sm');
        // Fallback: get all text if title/desc missing
        const textParts = [];
        if (title) {
          textParts.push(title);
        }
        if (desc) {
          textParts.push(desc);
        }
        if (!title && !desc) {
          const textContent = cardEl.textContent.trim();
          if (textContent) {
            textParts.push(textContent);
          }
        }
        // Only add cards that have at least image or text
        if (img || textParts.length) {
          cards.push([
            img ? img : '',
            textParts.length ? textParts : ''
          ]);
        }
      });
    }
    if (cards.length) {
      const headerRow = ['Cards (cards23)'];
      const tableRows = [headerRow, ...cards];
      const table = WebImporter.DOMUtils.createTable(tableRows, document);
      tabPane.replaceWith(table);
    }
  });
}

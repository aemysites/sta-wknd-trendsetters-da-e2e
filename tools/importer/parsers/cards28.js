/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCard(card) {
    // Try to find image container
    let img = card.querySelector('img');
    let imageCell = img ? img : '';

    // For text content: find heading and description
    let heading = card.querySelector('h3, .h4-heading');
    let desc = card.querySelector('.paragraph-sm');

    // Compose text cell
    let textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    // If heading or desc are missing, fallback to all text
    if (!heading && !desc) {
      textCellContent.push(document.createTextNode(card.textContent.trim()));
    }

    return [imageCell, textCellContent];
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  let rows = [];
  const headerRow = ['Cards (cards28)'];
  rows.push(headerRow);

  tabPanes.forEach(tabPane => {
    // Find the grid inside this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = Array.from(grid.children).filter(child => child.tagName === 'A');
    cards.forEach(card => {
      if (!card) return;
      const [imageCell, textCellContent] = extractCard(card);
      // Only add if there's at least one content
      if (imageCell !== '' || (textCellContent && textCellContent.length)) {
        rows.push([imageCell, textCellContent]);
      }
    });
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

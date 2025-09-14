/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card element
  function extractCardContent(card) {
    // Find image (if present)
    let img = card.querySelector('img');
    let imageCell = img ? img : '';

    // Find heading and description
    let heading = card.querySelector('h3, .h4-heading');
    let desc = card.querySelector('.paragraph-sm');
    // Compose text cell
    const textParts = [];
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    return [imageCell, textParts];
  }

  // Find all tab panes (each tab is a block of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Find grid container inside tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all card links inside grid
    const cards = grid.querySelectorAll(':scope > a');
    const cells = [];
    // Header row
    cells.push(['Cards (cards23)']);
    // Each card row
    cards.forEach((card) => {
      const [imageCell, textCell] = extractCardContent(card);
      cells.push([imageCell, textCell]);
    });
    // Create block table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    // Insert block before tabPane
    tabPane.parentNode.insertBefore(block, tabPane);
    // Remove original tabPane
    tabPane.remove();
  });
  // Remove the original element if all panes are gone
  if (element.childElementCount === 0) {
    element.remove();
  }
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from an anchor tag
  function extractCardContent(card) {
    // Find image (if present)
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Only reference the existing image element if present
    let imgCell = img ? img : '';

    // Find heading (h3)
    let heading = card.querySelector('h3');
    // Find description (div with class paragraph-sm)
    let desc = card.querySelector('.paragraph-sm');
    // Build text content cell
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    // If both are missing, ensure cell is not empty
    if (!heading && !desc) textContent.push('');
    return [imgCell, textContent];
  }

  // Find all tab panes (each with a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach(tabPane => {
    const rows = [['Cards (cards23)']];
    // Find the grid inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all card anchors inside the grid
    const cardLinks = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cardLinks.forEach(card => {
      rows.push(extractCardContent(card));
    });
    // Create the table block for this tab
    const table = WebImporter.DOMUtils.createTable(rows, document);
    tabPane.replaceWith(table);
  });
}

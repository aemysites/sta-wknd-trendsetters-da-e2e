/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image, title, and description from a card anchor
  function extractCardContent(card) {
    // Try to find image (mandatory for this block)
    let img = card.querySelector('img');
    // Defensive: if not found, leave cell empty
    let imageCell = img || '';

    // Try to find heading (title)
    let heading = card.querySelector('h3, h2, h4, h5, h6');
    let title = heading ? heading : '';

    // Try to find description (usually a div or p after heading)
    let desc = '';
    if (heading) {
      let next = heading.nextElementSibling;
      if (next && (next.matches('div, p'))) {
        desc = next;
      }
    } else {
      let fallback = card.querySelector('div, p');
      desc = fallback || '';
    }

    // Compose text cell: title (heading), then description
    let textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);

    return [imageCell, textCell];
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];

  // Always start with the header row
  rows.push(['Cards (cards18)']);

  // For each tab pane, find the grid, then each card
  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor (a.utility-link-content-block)
    const cards = grid.querySelectorAll('a.utility-link-content-block');
    cards.forEach(card => {
      if (!card) return;
      const [imageCell, textCell] = extractCardContent(card);
      rows.push([imageCell, textCell]);
    });
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

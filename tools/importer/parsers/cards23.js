/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card element
  function extractCardContent(card) {
    // Find image (if present)
    let img = card.querySelector('img');
    // Find heading (title)
    let heading = card.querySelector('h3, .h4-heading');
    // Find description
    let desc = card.querySelector('.paragraph-sm');
    // Compose text cell
    const textParts = [];
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    // Return [image, text] array
    return [img || '', textParts];
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  // We'll collect all cards from all tabs
  const rows = [];

  tabPanes.forEach(tabPane => {
    // Find the grid inside this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach(card => {
      // Only include cards that have either an image or heading
      const [img, textParts] = extractCardContent(card);
      // Defensive: skip if both are missing
      if (!img && textParts.length === 0) return;
      rows.push([img || '', textParts]);
    });
  });

  // Table header
  const headerRow = ['Cards (cards23)'];
  // Table cells: header + all card rows
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}

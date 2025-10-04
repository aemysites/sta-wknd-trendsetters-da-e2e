/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor
  function extractCardContent(card) {
    // Find image (if present)
    let img = card.querySelector('img');
    // Find heading
    let heading = card.querySelector('h3, h4, h5, h6');
    // Find description (paragraph-sm)
    let desc = card.querySelector('.paragraph-sm');
    // Compose text cell
    const textParts = [];
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    return [img || '', textParts];
  }

  // Find all tab panes (each tab contains cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  // Accumulate all cards from all tabs
  const cards = [];
  tabPanes.forEach(tabPane => {
    // Find grid container in tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all direct card anchors in grid
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach(card => {
      // Defensive: skip cards with no heading or description
      const heading = card.querySelector('h3, h4, h5, h6');
      const desc = card.querySelector('.paragraph-sm');
      if (!heading && !desc) return;
      // Extract image and text
      const [img, textParts] = extractCardContent(card);
      cards.push([img || '', textParts]);
    });
  });

  // Compose table rows
  const headerRow = ['Cards (cards23)'];
  const rows = cards.map(([img, textParts]) => [img, textParts]);
  const tableArray = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  // Replace original element
  element.replaceWith(block);
}

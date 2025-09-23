/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card anchor
  function extractCardInfo(cardEl) {
    // Find image (must reference the existing element)
    const img = cardEl.querySelector('img');
    if (!img) return null;
    // Compose text cell: include all text content (title, description, etc)
    const textCell = document.createElement('div');
    // Find heading (h3 or .h4-heading)
    const heading = cardEl.querySelector('h3, .h4-heading');
    if (heading) textCell.appendChild(heading.cloneNode(true));
    // Find all paragraph-sm elements (there may be more than one)
    const descs = cardEl.querySelectorAll('.paragraph-sm');
    descs.forEach(desc => textCell.appendChild(desc.cloneNode(true)));
    // Defensive: If no heading or desc, fallback to all text nodes inside cardEl
    if (!heading && descs.length === 0) {
      textCell.textContent = cardEl.textContent.trim();
    }
    // Also include any additional text nodes that are direct children of cardEl (for flexibility)
    Array.from(cardEl.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textCell.appendChild(p);
      }
    });
    return [img, textCell];
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];
  const headerRow = ['Cards (cards23)'];
  rows.push(headerRow);

  tabPanes.forEach(tabPane => {
    // Find the grid inside each tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach(cardEl => {
      const cardRow = extractCardInfo(cardEl);
      if (cardRow) rows.push(cardRow);
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

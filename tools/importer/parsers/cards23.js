/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Find the grid inside each tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get all card links (each card is an <a>)
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Defensive: Try to find image container
      let imgEl = card.querySelector('img');
      // Defensive: Try to find heading and description
      let heading = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = document.createElement('div');
      if (heading) textCell.appendChild(heading.cloneNode(true));
      if (desc) textCell.appendChild(desc.cloneNode(true));
      // Also include any other text nodes directly under card (for flexibility)
      Array.from(card.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          textCell.appendChild(document.createTextNode(node.textContent.trim()));
        }
      });
      // Only add row if image and text are present
      if (imgEl && textCell.textContent.trim()) {
        rows.push([imgEl.cloneNode(true), textCell]);
      }
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

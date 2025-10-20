/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block parser
  // Extract cards from ALL tabs, not just the first tab
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));
  if (!tabPanes.length) return;

  // Build rows for the table
  const rows = [];
  // Header row
  rows.push(['Cards (cards23)']);

  tabPanes.forEach(tabPane => {
    // Find the grid container inside each tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all card anchors inside the grid
    const cardAnchors = Array.from(grid.querySelectorAll('a.utility-link-content-block, a.card-link'));
    cardAnchors.forEach(card => {
      // Card image (if present)
      let img = card.querySelector('img.cover-image');
      // Card title
      let title = card.querySelector('h3');
      // Card description
      let desc = card.querySelector('.paragraph-sm');
      // Fallback: get all text content if title/desc missing
      let textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      // If title or desc missing, get all text content, but avoid duplicating what's already in title/desc
      if (!title || !desc) {
        let allText = card.textContent.trim();
        if (title) allText = allText.replace(title.textContent, '').trim();
        if (desc) allText = allText.replace(desc.textContent, '').trim();
        if (allText) textCell.push(document.createTextNode(allText));
      }
      if (textCell.length === 0) {
        const fallbackText = card.textContent.trim();
        if (fallbackText) textCell.push(document.createTextNode(fallbackText));
      }
      // First cell: image or empty string
      const imgCell = img ? img : '';
      rows.push([imgCell, textCell]);
    });
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

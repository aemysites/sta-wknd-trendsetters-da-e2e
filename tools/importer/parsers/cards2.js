/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from an <a> card element
  function extractCard(cardEl) {
    // Find image (first img descendant)
    const img = cardEl.querySelector('img');
    // Find heading (h3 or h4)
    let heading = cardEl.querySelector('h3, h4');
    // Find description (first <p> after heading)
    let desc = null;
    if (heading) {
      desc = heading.nextElementSibling;
      if (!desc || desc.tagName !== 'P') {
        desc = cardEl.querySelector('p');
      }
    } else {
      desc = cardEl.querySelector('p');
    }
    // Find CTA (button or link or div with button class)
    let cta = cardEl.querySelector('.button, button, a.button');
    // Compose text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);
    return [img, textCell];
  }

  // Get all cards (top-level <a> blocks and nested grid cards)
  const cards = [];
  // Top-level grid: section > div > div.grid-layout > ...
  const grids = element.querySelectorAll(':scope > div > div.grid-layout');
  grids.forEach(grid => {
    // Each grid may have direct <a> children or nested grids
    grid.childNodes.forEach(child => {
      if (child.nodeType === 1) { // element
        if (child.matches('a')) {
          cards.push(child);
        } else if (child.matches('div.grid-layout')) {
          // Nested grid: find <a> children
          child.querySelectorAll(':scope > a').forEach(a => cards.push(a));
        }
      }
    });
  });

  // Defensive: fallback if no cards found
  if (cards.length === 0) {
    // Try to find all <a> inside the element
    element.querySelectorAll('a').forEach(a => cards.push(a));
  }

  // Table header
  const headerRow = ['Cards (cards2)'];
  // Table rows: each card becomes a row [img, text]
  const rows = cards.map(cardEl => extractCard(cardEl));
  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace original element
  element.replaceWith(table);
}

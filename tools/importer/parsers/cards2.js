/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardAnchor) {
    // Find image (mandatory)
    const imgDiv = cardAnchor.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // If not found, try direct img
    if (!img) img = cardAnchor.querySelector('img');

    // Find heading (h3 or h4)
    let heading = cardAnchor.querySelector('h3, h4');

    // Find description (first p)
    let description = cardAnchor.querySelector('p');

    // Find CTA (button or link or div with class 'button')
    let cta = cardAnchor.querySelector('.button, button, a.button');

    // Compose text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (description) textCell.appendChild(description);
    if (cta) textCell.appendChild(cta);

    return [img, textCell];
  }

  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.grid-layout');
  let cards = [];

  // Defensive: some layouts nest a grid inside another grid
  // The first child is a card, the second child is a grid of cards
  // So, gather all direct card anchors from both levels
  let cardAnchors = [];
  if (mainGrid) {
    // Get all direct children that are <a>
    cardAnchors = Array.from(mainGrid.children).filter(el => el.tagName === 'A');
    // Also check for nested grid-layouts
    Array.from(mainGrid.children).forEach(child => {
      if (child.classList.contains('grid-layout')) {
        cardAnchors.push(...Array.from(child.children).filter(el => el.tagName === 'A'));
      }
    });
  }

  // Defensive fallback: if no grid found, try all anchors in element
  if (!cardAnchors.length) {
    cardAnchors = Array.from(element.querySelectorAll('a.utility-link-content-block'));
  }

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // Each card: [image, text cell]
  cardAnchors.forEach(cardAnchor => {
    const [img, textCell] = extractCardInfo(cardAnchor);
    // Only add row if image and text
    if (img && textCell) {
      rows.push([img, textCell]);
    }
  });

  // Create table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element
  element.replaceWith(block);
}

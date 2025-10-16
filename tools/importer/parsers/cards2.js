/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards2) block: 2 columns, first row is header, each subsequent row is a card (image, text)

  // Helper to extract card info from a card anchor or div
  function extractCard(cardEl) {
    // Find image (reference existing element)
    const imgDiv = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Find heading (h2, h3, h4)
    const heading = cardEl.querySelector('h2, h3, h4');
    // Find description (first <p> after heading)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or link, not the card itself)
    let cta = cardEl.querySelector('.button, button');
    // Compose text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);
    // Always return [image, text cell]
    return [img, textCell];
  }

  // Find the main grid container (holds all cards)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Cards: The first child is the large card, the rest are smaller cards in a nested grid
  const children = Array.from(grid.children);

  // First card (large, left column)
  let cardRows = [];
  if (children.length > 0) {
    const firstCard = children[0];
    cardRows.push(extractCard(firstCard));
  }

  // Nested grid (right column) contains 4 smaller cards
  if (children.length > 1) {
    const nestedGrid = children[1];
    // Each card is an anchor
    const smallCards = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
    smallCards.forEach(cardEl => {
      cardRows.push(extractCard(cardEl));
    });
  }

  // Table header
  const headerRow = ['Cards (cards2)'];
  const tableRows = [headerRow, ...cardRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace element
  element.replaceWith(block);
}

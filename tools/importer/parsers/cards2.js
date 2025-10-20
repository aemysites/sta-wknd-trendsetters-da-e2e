/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The main card is the first direct child <a>
  const mainCard = mainGrid.querySelector('a.utility-link-content-block');
  // The nested grid contains the remaining cards
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainCard || !nestedGrid) return;

  // Helper to extract card content
  function extractCard(card) {
    // Image: first img inside a .utility-aspect-* container
    const imgContainer = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Heading: h2, h3, or h4
    const heading = card.querySelector('h2, h3, h4');
    // Description: first <p>
    const description = card.querySelector('p');
    // CTA: .button (optional)
    const cta = card.querySelector('.button');

    // Compose cell content (preserve semantic HTML)
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (description) textCell.appendChild(description);
    if (cta) textCell.appendChild(cta);

    return [img, textCell];
  }

  // Build table rows
  const rows = [];
  rows.push(['Cards (cards2)']); // Header row
  rows.push(extractCard(mainCard));

  // Remaining cards in nested grid
  const otherCards = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
  otherCards.forEach(card => {
    rows.push(extractCard(card));
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

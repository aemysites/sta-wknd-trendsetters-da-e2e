/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card element
  function extractCard(cardEl) {
    // Find image: first img inside the card
    const img = cardEl.querySelector('img');

    // Find heading: first h1-h6 inside the card
    const heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');

    // Find description: first <p> after heading or first <p>
    let description = null;
    if (heading) {
      description = heading.nextElementSibling && heading.nextElementSibling.tagName.toLowerCase() === 'p'
        ? heading.nextElementSibling
        : cardEl.querySelector('p');
    } else {
      description = cardEl.querySelector('p');
    }

    // Find CTA: .button, button, or a.button
    let cta = cardEl.querySelector('.button, button');
    if (!cta) cta = cardEl.querySelector('a.button');

    // Compose text cell: heading, description, cta (if present)
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (description) textCell.appendChild(description);
    if (cta) textCell.appendChild(cta);

    return [img, textCell];
  }

  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The first card is a large card (left), then a nested grid for the right cards
  const cards = [];
  // First card: anchor directly under mainGrid
  const firstCard = mainGrid.querySelector('a.utility-link-content-block');
  if (firstCard) cards.push(firstCard);

  // Nested grid for right-side cards
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (nestedGrid) {
    nestedGrid.querySelectorAll('a.utility-link-content-block').forEach(card => {
      cards.push(card);
    });
  }

  // Defensive: also add any other direct cards not already included
  mainGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(card => {
    if (!cards.includes(card)) cards.push(card);
  });

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);
  // Card rows
  cards.forEach(cardEl => {
    const [img, textCell] = extractCard(cardEl);
    // Only add row if image and some text
    if (img && textCell.textContent.trim()) {
      rows.push([img, textCell]);
    }
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card block
  function extractImage(card) {
    // Find the first img inside the card
    return card.querySelector('img');
  }

  // Helper to extract text content (heading, description, CTA) from a card block
  function extractTextContent(card) {
    // Create a fragment to hold the text content
    const frag = document.createDocumentFragment();
    // Find heading (h2 or h3 or h4)
    const heading = card.querySelector('h2, h3, h4, h5, h6');
    if (heading) frag.appendChild(heading);
    // Find description (first <p> after heading)
    const description = card.querySelector('p');
    if (description) frag.appendChild(description);
    // Find CTA (button or .button or link at the bottom)
    const cta = card.querySelector('.button, button, a.button');
    if (cta) frag.appendChild(cta);
    return frag;
  }

  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Gather all card elements (direct children that are links)
  // The first card is a large card, the rest are in a nested grid
  const cards = [];
  // First card (large)
  const firstCard = mainGrid.querySelector('a.utility-link-content-block');
  if (firstCard) cards.push(firstCard);
  // Nested grid for the rest
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout');
  if (nestedGrid) {
    nestedGrid.querySelectorAll('a.utility-link-content-block').forEach(card => {
      cards.push(card);
    });
  }

  // Defensive: If not found, try fallback (all direct a.utility-link-content-block)
  if (cards.length === 0) {
    mainGrid.querySelectorAll('a.utility-link-content-block').forEach(card => {
      cards.push(card);
    });
  }

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);

  // For each card, extract image and text content
  cards.forEach(card => {
    const img = extractImage(card);
    const textContent = extractTextContent(card);
    // Only add row if both image and text exist
    if (img && textContent) {
      rows.push([img, textContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

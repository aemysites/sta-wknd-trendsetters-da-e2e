/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card anchor/div
  function extractCard(card) {
    // Find the image (mandatory)
    let img = card.querySelector('img');
    // Defensive: if image is wrapped in a div, get the div
    let imgContainer = img ? img.closest('div') : null;
    if (!img && imgContainer) {
      // fallback: use the container itself if no img
      img = imgContainer;
    }
    // Find heading (h2, h3, h4)
    let heading = card.querySelector('h2, h3, h4, h5, h6');
    // Find description (first <p> after heading)
    let desc = card.querySelector('p');
    // Find CTA: look for .button or a button-like element (could be a div or a link)
    let cta = card.querySelector('.button, a.button, button');
    // Compose text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    return [imgContainer || img, textContent];
  }

  // Find the grid containing all cards
  const container = element.querySelector('.grid-layout');
  // The first card is a large card, the rest are in a nested grid
  const cards = [];
  // First card: direct child <a>
  const firstCard = container.querySelector(':scope > a.utility-link-content-block');
  if (firstCard) {
    cards.push(firstCard);
  }
  // Nested grid for remaining cards
  const nestedGrid = container.querySelector(':scope > .grid-layout');
  if (nestedGrid) {
    nestedGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(card => {
      cards.push(card);
    });
  }

  // Build table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards2)'];
  rows.push(headerRow);
  // Card rows
  cards.forEach(card => {
    const [imgCell, textCell] = extractCard(card);
    rows.push([imgCell, textCell]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

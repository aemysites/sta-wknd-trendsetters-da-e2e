/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card data from a card anchor element
  function extractCard(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find heading (h1-h6)
    const heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');
    // Find description (first <p> after heading)
    const desc = cardEl.querySelector('p');
    // Find CTA: button or link (not the card anchor itself)
    let cta = cardEl.querySelector('.button, button, a:not([href="#"])');
    // If no CTA inside, check if the card itself is a link with a button-like child
    if (!cta && cardEl.classList.contains('utility-link-content-block')) {
      cta = cardEl.querySelector('div.button');
    }
    // Build text cell
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the main container with the cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The first card is the large feature card (direct child anchor)
  const featureCard = mainGrid.querySelector('a.utility-link-content-block');

  // The rest of the cards are inside the nested grid (right column)
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  const smallCards = nestedGrid ? Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block')) : [];

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // Feature card (large card on the left)
  if (featureCard) {
    const img = featureCard.querySelector('img');
    // Text: heading, description, CTA (button)
    const heading = featureCard.querySelector('h1, h2, h3, h4, h5, h6');
    const desc = featureCard.querySelector('p');
    const cta = featureCard.querySelector('.button, button, a:not([href="#"])');
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    rows.push([img, textContent]);
  }

  // Small cards (right column)
  smallCards.forEach(cardEl => {
    const [img, textContent] = extractCard(cardEl);
    rows.push([img, textContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards2) block: 2 columns, 1 header row, each card = 1 row
  // 1. Find the parent container holding all cards
  // 2. For each card, extract: image (first cell), text content (second cell)
  // 3. The first card (feature card) is visually larger and contains a CTA

  // Helper to extract card content
  function extractCard(cardEl) {
    // Find image
    const img = cardEl.querySelector('img');
    // Find heading
    const heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    // Find description (first <p> after heading)
    let description = null;
    if (heading) {
      description = heading.nextElementSibling && heading.nextElementSibling.tagName === 'P'
        ? heading.nextElementSibling
        : cardEl.querySelector('p');
    } else {
      description = cardEl.querySelector('p');
    }
    // Find CTA (button or link)
    let cta = cardEl.querySelector('.button, a.button, button');
    // Compose text cell
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    if (cta) cellContent.push(cta);
    return [img, cellContent];
  }

  // Find grid container holding all cards
  const gridContainers = element.querySelectorAll('.grid-layout');
  let cardEls = [];

  // The first grid contains the feature card (large left card)
  if (gridContainers.length > 0) {
    const firstGrid = gridContainers[0];
    // First child is the feature card (usually an <a> with image, heading, desc, CTA)
    const featureCard = firstGrid.querySelector('.utility-link-content-block');
    if (featureCard) cardEls.push(featureCard);
    // The next child is a nested grid with the rest of the cards
    const nestedGrid = firstGrid.querySelector('.grid-layout');
    if (nestedGrid) {
      // Each card is an <a> with image, heading, desc
      const nestedCards = Array.from(nestedGrid.querySelectorAll('.utility-link-content-block'));
      cardEls = cardEls.concat(nestedCards);
    }
  }

  // Defensive: If no cards found, fallback to all .utility-link-content-block in element
  if (cardEls.length === 0) {
    cardEls = Array.from(element.querySelectorAll('.utility-link-content-block'));
  }

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);
  // Card rows
  cardEls.forEach(cardEl => {
    rows.push(extractCard(cardEl));
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}

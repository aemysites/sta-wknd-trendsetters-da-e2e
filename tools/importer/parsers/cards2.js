/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from an anchor card element
  function extractCard(cardEl) {
    // Find image (mandatory)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Find heading (h3 or h4)
    let heading = cardEl.querySelector('h3, h4');
    // Find description (p)
    let description = cardEl.querySelector('p');
    // Find CTA (button or .button)
    let cta = cardEl.querySelector('.button, button');

    // Compose text cell contents
    const textContents = [];
    if (heading) textContents.push(heading);
    if (description) textContents.push(description);
    if (cta) textContents.push(cta);

    return [img, textContents];
  }

  // Top-level grid contains cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  // The first card is a bit different: contains a nested grid after itself
  const cardEls = [];
  // First card is the first child anchor
  const firstCard = mainGrid.querySelector('a.utility-link-content-block');
  if (firstCard) cardEls.push(firstCard);
  // Nested grid contains the rest
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout');
  if (nestedGrid) {
    nestedGrid.querySelectorAll('a.utility-link-content-block').forEach(card => cardEls.push(card));
  }

  // Table header
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Build rows for each card
  cardEls.forEach(cardEl => {
    const [img, textContents] = extractCard(cardEl);
    // Defensive: only add if image and text
    if (img && textContents.length) {
      rows.push([img, textContents]);
    }
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}

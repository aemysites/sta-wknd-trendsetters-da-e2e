/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor
  function extractCardContent(cardEl) {
    // Find image (mandatory)
    let img = cardEl.querySelector('img');
    // Find heading (h3 or h4)
    let heading = cardEl.querySelector('h3, h4');
    // Find description (first <p>)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or link inside card)
    let cta = cardEl.querySelector('.button, .cta, a.button');

    // Compose text cell
    const textParts = [];
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    if (cta) textParts.push(cta);
    return [img, textParts];
  }

  // Find all cards (anchors with class 'utility-link-content-block')
  // There is one nested grid, so we need to get all anchors at any depth
  const cards = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // Each card becomes a row: [image, text cell]
  cards.forEach(cardEl => {
    const [img, textParts] = extractCardContent(cardEl);
    rows.push([img, textParts]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor or div
  function extractCard(cardEl) {
    // Find the image (mandatory)
    let img = cardEl.querySelector('img');
    // Find heading (h3 or h4)
    let heading = cardEl.querySelector('h3, h4');
    // Find description (first <p> after heading)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or link or div.button)
    let cta = cardEl.querySelector('.button, button, a.button');

    // Compose text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the main grid containing the cards
  const container = element.querySelector('.grid-layout');
  if (!container) return;

  // The first card is a little different: it's a link with image+heading+p+button
  const cards = [];
  // The first card is the first direct child <a> of the main grid
  const firstCard = container.querySelector(':scope > a.utility-link-content-block');
  if (firstCard) {
    cards.push(extractCard(firstCard));
  }

  // The rest of the cards are inside a nested grid-layout
  const nestedGrid = container.querySelector(':scope > .grid-layout');
  if (nestedGrid) {
    // Each card is an <a> inside the nested grid
    nestedGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(cardEl => {
      cards.push(extractCard(cardEl));
    });
  }

  // Add header row
  const rows = [ ['Cards (cards2)'] ];
  // Add each card as a row
  cards.forEach(card => {
    rows.push(card);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

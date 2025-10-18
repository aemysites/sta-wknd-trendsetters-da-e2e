/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card element
  function extractCard(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the heading (h2, h3, h4)
    const heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    // Find the description (first <p> after heading)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or link)
    let cta = cardEl.querySelector('.button, button, a.button');
    // Compose text cell contents
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the main grid container holding all cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find all card elements, including those nested in grids
  let allCards = [];
  Array.from(grid.children).forEach((el) => {
    if (el.classList.contains('grid-layout')) {
      // Nested grid: add its card children
      Array.from(el.children).forEach((child) => {
        if (child.matches('a.utility-link-content-block, .utility-link-content-block, a.w-inline-block, .w-inline-block')) {
          allCards.push(child);
        }
      });
    } else if (el.matches('a.utility-link-content-block, .utility-link-content-block, a.w-inline-block, .w-inline-block')) {
      allCards.push(el);
    }
  });

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);
  // Card rows
  allCards.forEach((card) => {
    rows.push(extractCard(card));
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with block
  element.replaceWith(block);
}

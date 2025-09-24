/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor or div
  function extractCard(cardEl) {
    // Find the image (mandatory)
    let img = cardEl.querySelector('img');
    // Find the heading (h2, h3, h4, etc.)
    let heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');
    // Find the description (first <p> after heading)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or link inside card, but not the card link itself)
    let cta = null;
    // Look for .button or a.button inside cardEl
    cta = cardEl.querySelector('.button, a.button');
    // If not found, look for a link that's not the card wrapper
    if (!cta) {
      const links = Array.from(cardEl.querySelectorAll('a'));
      for (const link of links) {
        if (link !== cardEl && !link.classList.contains('utility-link-content-block')) {
          cta = link;
          break;
        }
      }
    }
    // Compose the text cell
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the grid containing the cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The first card is a direct child anchor of mainGrid
  const cards = [];
  const directCards = Array.from(mainGrid.children).filter(child => child.classList.contains('utility-link-content-block'));
  // The nested grid contains more cards
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout');
  let nestedCards = [];
  if (nestedGrid) {
    nestedCards = Array.from(nestedGrid.querySelectorAll('.utility-link-content-block'));
  }

  // Compose all cards in order: first direct, then nested
  const allCards = [...directCards, ...nestedCards];

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);
  // Card rows
  allCards.forEach(cardEl => {
    const [img, textContent] = extractCard(cardEl);
    rows.push([img, textContent]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

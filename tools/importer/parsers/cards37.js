/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Helper to extract card info from a card element
  function extractCard(cardEl) {
    // Find image (mandatory)
    let img = null;
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    if (!img) {
      img = cardEl.querySelector('img');
    }

    // Find heading (h3)
    let heading = cardEl.querySelector('h3');
    // Find description (p)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or .button div)
    let cta = cardEl.querySelector('.button, button, a.button');

    // Compose text cell
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);

    // Always image in first cell, text in second
    return [img, textContent];
  }

  // Find all card blocks (direct children that are links)
  let cardEls = Array.from(grid.children).filter(
    (child) => child.classList.contains('utility-link-content-block')
  );

  // If there's a nested grid, add its cards too
  grid.querySelectorAll('.w-layout-grid.grid-layout').forEach((nestedGrid) => {
    Array.from(nestedGrid.children).forEach((child) => {
      if (child.classList.contains('utility-link-content-block')) {
        cardEls.push(child);
      }
    });
  });

  // Build table rows
  const rows = [['Cards (cards37)']];
  cardEls.forEach((cardEl) => {
    rows.push(extractCard(cardEl));
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Helper to extract card content
  function extractCard(cardEl) {
    // Find image container (may be nested)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgContainer ? imgContainer.querySelector('img') : null;
    if (!img) return null;

    // Find heading (h3)
    let heading = cardEl.querySelector('h3');
    // Find description (p)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or .button class)
    let cta = cardEl.querySelector('.button, button');

    // Compose text cell
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);

    return [img, textContent];
  }

  // Compose rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);

  // Find all card blocks (direct children that are links)
  const cardEls = Array.from(mainGrid.children).filter(
    (el) => el.classList.contains('utility-link-content-block')
  );

  // Also handle nested grids (for cards inside another grid)
  cardEls.forEach((cardEl) => {
    // If this card contains another grid, flatten its cards too
    const nestedGrid = cardEl.querySelector('.w-layout-grid.grid-layout');
    if (nestedGrid) {
      Array.from(nestedGrid.children).forEach((nestedCard) => {
        if (nestedCard.classList.contains('utility-link-content-block')) {
          const cardRow = extractCard(nestedCard);
          if (cardRow) rows.push(cardRow);
        }
      });
    } else {
      const cardRow = extractCard(cardEl);
      if (cardRow) rows.push(cardRow);
    }
  });

  // Also check for cards that are direct children of nested grids (not wrapped in link)
  const nestedGrids = mainGrid.querySelectorAll('.w-layout-grid.grid-layout');
  nestedGrids.forEach((ng) => {
    Array.from(ng.children).forEach((nestedCard) => {
      if (nestedCard.classList.contains('utility-link-content-block')) {
        const cardRow = extractCard(nestedCard);
        if (cardRow) rows.push(cardRow);
      }
    });
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardAnchor) {
    // Find image (mandatory)
    const img = cardAnchor.querySelector('img');
    // Find heading (h3 or h4)
    const heading = cardAnchor.querySelector('h3, .h2-heading, .h4-heading');
    // Find description (p)
    const desc = cardAnchor.querySelector('p');
    // Find CTA (button or link)
    let cta = cardAnchor.querySelector('.button, button, a.button');
    // Compose text cell
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    if (cta) textCellContent.push(cta);
    return [img, textCellContent];
  }

  // Find the main grid containing all cards
  const grids = element.querySelectorAll(':scope > div > .grid-layout');
  let cards = [];

  // The first grid contains the first card and a nested grid with the rest
  if (grids.length > 0) {
    // First card is the first anchor in the first grid
    const firstGrid = grids[0];
    const firstCardAnchor = firstGrid.querySelector(':scope > a.utility-link-content-block');
    if (firstCardAnchor) {
      cards.push(extractCardInfo(firstCardAnchor));
    }
    // Nested grid contains remaining cards
    const nestedGrid = firstGrid.querySelector(':scope > .grid-layout');
    if (nestedGrid) {
      const cardAnchors = nestedGrid.querySelectorAll(':scope > a.utility-link-content-block');
      cardAnchors.forEach(anchor => {
        cards.push(extractCardInfo(anchor));
      });
    }
  }

  // Defensive: If above fails, fallback to all anchors
  if (cards.length === 0) {
    const allAnchors = element.querySelectorAll('a.utility-link-content-block');
    allAnchors.forEach(anchor => {
      cards.push(extractCardInfo(anchor));
    });
  }

  // Table header
  const headerRow = ['Cards (cards2)'];
  // Table rows: each card is [image, text]
  const tableRows = cards.map(([img, textCellContent]) => [img, textCellContent]);
  const cells = [headerRow, ...tableRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}

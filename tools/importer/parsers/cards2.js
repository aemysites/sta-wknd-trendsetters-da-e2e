/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from anchor blocks
  function extractCard(anchor) {
    // Find image (mandatory, always first child of a div)
    let img = anchor.querySelector('img');
    // Find heading (h3 or h4)
    let heading = anchor.querySelector('h3, h4');
    // Find description (p)
    let desc = anchor.querySelector('p');
    // Find CTA (button div with text, optional)
    let cta = anchor.querySelector('.button');

    // First cell: image
    const imgCell = img ? img : '';

    // Second cell: text content
    const textParts = [];
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    if (cta) textParts.push(cta);
    const textCell = textParts.length ? textParts : '';

    return [imgCell, textCell];
  }

  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.grid-layout');
  // First card is a direct child anchor, rest are in nested grid
  const cardRows = [];

  // Header row
  cardRows.push(['Cards (cards2)']);

  // First card (direct child anchor)
  const firstAnchor = mainGrid.querySelector(':scope > a.utility-link-content-block');
  if (firstAnchor) {
    cardRows.push(extractCard(firstAnchor));
  }

  // Nested grid with remaining cards
  const nestedGrid = mainGrid.querySelector(':scope > .grid-layout');
  if (nestedGrid) {
    const anchors = nestedGrid.querySelectorAll(':scope > a.utility-link-content-block');
    anchors.forEach(anchor => {
      cardRows.push(extractCard(anchor));
    });
  }

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cardRows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor
  function extractCardRow(cardAnchor) {
    // Find image (mandatory)
    let img = cardAnchor.querySelector('img');
    // Find heading (h3 or h4)
    let heading = cardAnchor.querySelector('h3, h4');
    // Find description (p)
    let desc = cardAnchor.querySelector('p');
    // Find CTA (button or link inside card)
    let cta = cardAnchor.querySelector('.button, a.button');
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // Find the main grid containing cards
  const mainGrid = element.querySelector('.grid-layout');
  let cardRows = [];

  // The first card is a bit different: it contains a CTA
  const firstCardAnchor = mainGrid.querySelector(':scope > a.utility-link-content-block');
  if (firstCardAnchor) {
    cardRows.push(extractCardRow(firstCardAnchor));
  }

  // The rest of the cards are inside the nested grid
  const nestedGrid = mainGrid.querySelector(':scope > .grid-layout');
  if (nestedGrid) {
    const anchors = nestedGrid.querySelectorAll(':scope > a.utility-link-content-block');
    anchors.forEach(anchor => {
      cardRows.push(extractCardRow(anchor));
    });
  }

  // Table header
  const headerRow = ['Cards (cards7)'];
  // Compose table rows
  const tableRows = [headerRow, ...cardRows];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}

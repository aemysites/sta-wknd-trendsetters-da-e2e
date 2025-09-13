/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (should be the only .cover-image img)
  const img = element.querySelector('img.cover-image');

  // Find the card containing the text and CTA
  let card = null;
  // The card is nested inside two grid-layout divs
  const gridDivs = element.querySelectorAll(':scope > div');
  for (const gridDiv of gridDivs) {
    const innerGrids = gridDiv.querySelectorAll(':scope > div');
    for (const innerGrid of innerGrids) {
      const possibleCard = innerGrid.querySelector('.card');
      if (possibleCard) {
        card = possibleCard;
        break;
      }
    }
    if (card) break;
  }
  // Fallback: direct search if above fails
  if (!card) {
    card = element.querySelector('.card');
  }

  // Table rows: block name, image, content
  const headerRow = ['Hero (hero6)'];
  const imageRow = [img ? img : ''];
  const contentRow = [card ? card : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children divs
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Find background image (row 2)
  let bgImg = null;
  for (const div of topDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // Find content card (row 3)
  let contentCard = null;
  for (const div of topDivs) {
    // Look for nested grid with card
    const card = div.querySelector('.card');
    if (card) {
      contentCard = card;
      break;
    }
  }

  // Table rows
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCard ? contentCard : ''];

  // Create table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

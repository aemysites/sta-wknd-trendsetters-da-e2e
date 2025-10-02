/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Defensive: get all direct child <a> elements (each card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach((card) => {
    // Find the image (mandatory)
    const imgWrapper = card.querySelector(':scope > div.utility-aspect-2x3');
    let imageElem = null;
    if (imgWrapper) {
      imageElem = imgWrapper.querySelector('img');
    }

    // Compose text content for the card
    const textContent = [];

    // Tag and Date row (optional, visually grouped)
    const tagDateRow = card.querySelector(':scope > div.flex-horizontal');
    if (tagDateRow) {
      // This contains tag and date, keep both
      textContent.push(tagDateRow);
    }

    // Title (mandatory, h3)
    const titleElem = card.querySelector(':scope > h3');
    if (titleElem) {
      textContent.push(titleElem);
    }

    // Compose the row: [image, text]
    // If image missing, use null (shouldn't happen in this block)
    rows.push([
      imageElem || document.createTextNode(''),
      textContent
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

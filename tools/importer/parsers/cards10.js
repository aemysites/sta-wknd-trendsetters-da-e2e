/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card-link element
  function extractCard(cardEl) {
    // Find image (mandatory)
    const imgContainer = cardEl.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }

    // Find tag (optional, but present in all examples)
    const tagGroup = cardEl.querySelector('.tag-group');
    let tag = null;
    if (tagGroup) {
      tag = tagGroup.querySelector('.tag');
    }

    // Find heading (mandatory)
    const heading = cardEl.querySelector('h3');

    // Find description (mandatory)
    const desc = cardEl.querySelector('p');

    // Compose text cell
    const textCellContent = [];
    if (tag) {
      textCellContent.push(tag);
    }
    if (heading) {
      textCellContent.push(heading);
    }
    if (desc) {
      textCellContent.push(desc);
    }

    // Return [image, text cell]
    return [img, textCellContent];
  }

  // Get all card-link elements (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build table rows
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];
  cards.forEach(cardEl => {
    const cardRow = extractCard(cardEl);
    rows.push(cardRow);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}

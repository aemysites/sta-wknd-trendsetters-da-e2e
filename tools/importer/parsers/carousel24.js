/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the carousel block
  const headerRow = ['Carousel (carousel24)'];

  // Defensive: find the card structure
  let card = element.querySelector('.card-body');
  if (!card) {
    // fallback: try to find any .card
    card = element.querySelector('.card') || element;
  }

  // Find the image (mandatory, first cell)
  let image = card.querySelector('img');
  // Defensive: if not found, try in the whole element
  if (!image) {
    image = element.querySelector('img');
  }

  // Find the heading (optional, second cell)
  let heading = card.querySelector('.h4-heading');
  // Defensive: if not found, try for h1-h6
  if (!heading) {
    heading = card.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // Compose the text cell
  const textCellContent = [];
  if (heading) {
    // Use a heading element (clone to avoid moving it from DOM)
    const h = document.createElement('h2');
    h.innerHTML = heading.innerHTML;
    textCellContent.push(h);
  }

  // If there is any other text content (description), add it
  // In this HTML, there is no description, but code is future-proof
  // Look for any <p> or text nodes after the heading
  if (card && heading) {
    let next = heading.nextSibling;
    while (next) {
      if (next.nodeType === Node.ELEMENT_NODE && next.tagName.toLowerCase() === 'p') {
        textCellContent.push(next.cloneNode(true));
      }
      next = next.nextSibling;
    }
  }

  // If nothing else, leave text cell empty
  const row = [image, textCellContent.length ? textCellContent : ''];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

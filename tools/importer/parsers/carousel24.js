/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Table header row as required
  const headerRow = ['Carousel (carousel24)'];

  // Find the card content
  // The image and heading are nested inside several divs
  let imageEl = null;
  let headingEl = null;

  // Try to find the deepest .card-body
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Find image
    imageEl = cardBody.querySelector('img');
    // Find heading
    headingEl = cardBody.querySelector('.h4-heading');
  }

  // Build the text cell
  let textCell = '';
  if (headingEl) {
    // Create a heading element for the title
    const h2 = document.createElement('h2');
    h2.textContent = headingEl.textContent;
    textCell = h2;
  }

  // Build the rows array
  const rows = [headerRow];
  // Only add if image exists
  if (imageEl) {
    rows.push([
      imageEl,
      textCell || ''
    ]);
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

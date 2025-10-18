/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block expects: header row, then rows of [image, text content]
  const headerRow = ['Carousel (carousel24)'];
  const rows = [headerRow];

  // Defensive: find the card body (contains text and image)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find image (first cell)
  const img = cardBody.querySelector('img');

  // Find heading (optional, second cell)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose text cell: heading only (all text content from HTML must be included)
  let textCell = '';
  if (heading) {
    // Use the heading text only, not the element itself
    textCell = heading.textContent;
  }

  // Add the slide row: [image, textCell]
  rows.push([img, textCell]);

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

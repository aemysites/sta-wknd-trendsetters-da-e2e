/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block: 2 columns, header row, each slide is a row
  // Source HTML has a single card with image and heading

  // Header row
  const headerRow = ['Carousel (carousel24)'];

  // Find the card body
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract image (mandatory)
  const image = cardBody.querySelector('img');
  if (!image) return;

  // Extract heading (optional)
  const heading = cardBody.querySelector('.h4-heading');
  let textCell = '';
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell = h2;
  }

  // Build rows: header, then one slide row (image in first cell, heading in second cell)
  const rows = [headerRow, [image, textCell]];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

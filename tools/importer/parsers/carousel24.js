/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block parsing
  // Header row as per block guidelines
  const headerRow = ['Carousel (carousel24)'];
  const rows = [headerRow];

  // Defensive: Find the main card body
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // If not found, do nothing
    return;
  }

  // Extract image (mandatory, first cell)
  const img = cardBody.querySelector('img');

  // Extract heading (optional, second cell)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose text content cell
  let textCell = null;
  if (heading) {
    // Wrap heading in a div for semantic grouping
    const textDiv = document.createElement('div');
    textDiv.appendChild(heading);
    textCell = textDiv;
  } else {
    textCell = '';
  }

  // Add slide row: [image, text content]
  rows.push([
    img || '',
    textCell
  ]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}

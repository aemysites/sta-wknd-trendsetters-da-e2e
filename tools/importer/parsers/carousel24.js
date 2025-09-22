/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per requirements
  const headerRow = ['Carousel (carousel24)'];

  // Defensive: Find the main card container
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // fallback: try to find the first .card-body anywhere inside
    cardBody = element.querySelector('[class*="card-body"]');
  }

  // Defensive: Find image (mandatory)
  let img = cardBody ? cardBody.querySelector('img') : element.querySelector('img');
  // Defensive: Find heading (optional)
  let heading = cardBody ? cardBody.querySelector('.h4-heading, h4, h3, h2, h1') : null;

  // Prepare text content cell (if any)
  let textCell = null;
  if (heading) {
    // Use heading as heading element
    textCell = document.createElement('div');
    textCell.appendChild(heading);
  }

  // Compose the table rows
  const rows = [headerRow];

  // Each slide: [image, text content]
  const slideRow = [img];
  if (textCell) {
    slideRow.push(textCell);
  } else {
    // If no text, add empty cell for text content
    slideRow.push('');
  }
  rows.push(slideRow);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

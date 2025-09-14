/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card container
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // Fallback: try to find the first .card-body anywhere inside
    cardBody = element.querySelector('[class*="card-body"]');
  }

  // Defensive: Find the image
  let img = cardBody ? cardBody.querySelector('img') : element.querySelector('img');
  // Defensive: Find the heading
  let heading = cardBody ? cardBody.querySelector('.h4-heading') : element.querySelector('.h4-heading');

  // Compose text cell
  const textCell = [];
  if (heading) {
    textCell.push(heading);
  }

  // If there is additional description, add it (none in this example)
  // In future, could look for <p> or other elements below heading

  // Table header
  const headerRow = ['Cards (cards21)'];
  // Table row: [image, text]
  const cardRow = [img, textCell];

  const cells = [headerRow, cardRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

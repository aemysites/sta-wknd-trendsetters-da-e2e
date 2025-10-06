/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cards24)'];

  // Defensive: Find the card body
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    cardBody = element.querySelector('[class*="card-body"]');
  }

  // Defensive: Find the heading and image
  let heading = cardBody ? cardBody.querySelector('.h4-heading') : null;
  let image = cardBody ? cardBody.querySelector('img') : null;

  // Compose the text cell
  const textCell = [];
  if (heading) {
    textCell.push(heading);
  }
  // No description or CTA in source HTML, so only heading

  // Compose the card row: [image, text]
  const cardRow = [image, textCell];

  // Build the table
  const rows = [headerRow, cardRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}

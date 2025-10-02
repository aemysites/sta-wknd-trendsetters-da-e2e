/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the innermost card content
  // The structure is: element > div > div.card > div.card-body > .h4-heading + img
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Get image (mandatory, always first cell)
  const img = cardBody.querySelector('img');
  // Get title (optional, styled as heading)
  const title = cardBody.querySelector('.h4-heading');

  // Compose text cell: title (heading) only, no description or CTA present in this HTML
  const textCell = [];
  if (title) textCell.push(title);

  // Table header row
  const headerRow = ['Cards (cards24)'];
  // Table card row: [image, text]
  const cardRow = [img, textCell];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cardRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}

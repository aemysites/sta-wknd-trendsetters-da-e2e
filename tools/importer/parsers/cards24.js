/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as per block requirements
  const headerRow = ['Cards (cards24)'];

  // 2. Defensive: Find the innermost card body
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // fallback: try to find any .card-body in descendants
    cardBody = element.querySelector('[class*="card-body"]');
  }

  // 3. Defensive: Find image (reference the real DOM element, do not clone)
  let image = cardBody ? cardBody.querySelector('img') : element.querySelector('img');

  // 4. Defensive: Find heading (reference the real DOM element, do not clone)
  let heading = cardBody ? cardBody.querySelector('.h4-heading, h4, .card-title, [class*="heading"]') : null;

  // 5. Build text content cell (preserve semantic heading)
  const textCellContent = [];
  if (heading) textCellContent.push(heading);
  // No description in source, so nothing else to add

  // 6. Only add row if both image and heading exist
  const rows = [headerRow];
  if (image && heading) {
    rows.push([
      image,
      textCellContent
    ]);
  }

  // 7. Create the table block (using DOMUtils)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

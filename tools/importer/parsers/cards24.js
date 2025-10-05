/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards24)'];

  // Defensive: Find the card container (may be nested)
  // The image and heading are inside nested divs
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // fallback: try to find the deepest div with an image
    cardBody = element.querySelector('img')?.closest('div') || element;
  }

  // Get the image (mandatory)
  const img = cardBody.querySelector('img');

  // Get the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell
  const textCellContent = [];
  if (heading) textCellContent.push(heading);
  // No description or CTA in this HTML, but could be present in other variants
  // If there were a description, it would be below the heading

  // Build the table rows
  const rows = [headerRow];
  rows.push([
    img,
    textCellContent.length ? textCellContent : '',
  ]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

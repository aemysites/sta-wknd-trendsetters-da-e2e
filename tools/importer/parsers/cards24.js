/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block: 2 columns, multiple rows, header row is block name
  // Find all card containers (in this case, only one card)
  // The card structure: .ix-card-rotate-2 > .card > .card-body
  
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Defensive: find all cards in this block
  const cardContainers = element.querySelectorAll('.ix-card-rotate-2');
  cardContainers.forEach(cardContainer => {
    // Find the card body
    const cardBody = cardContainer.querySelector('.card-body');
    if (!cardBody) return;
    // Find the image (mandatory, first column)
    const img = cardBody.querySelector('img');
    // Find the heading (optional, styled as heading)
    const heading = cardBody.querySelector('.h4-heading');
    // Find description (optional, below heading, not present in this HTML)
    // For this HTML, only heading is present

    // Build text cell: heading (if present)
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    // No description or CTA in this example

    // Add row: [image, text content]
    if (img && textCellContent.length > 0) {
      rows.push([img, textCellContent]);
    }
  });

  // If no cards found, fallback: try to find a single card structure
  if (rows.length === 1) {
    // Try to find a card-body directly
    const cardBody = element.querySelector('.card-body');
    if (cardBody) {
      const img = cardBody.querySelector('img');
      const heading = cardBody.querySelector('.h4-heading');
      const textCellContent = [];
      if (heading) textCellContent.push(heading);
      if (img && textCellContent.length > 0) {
        rows.push([img, textCellContent]);
      }
    }
  }

  // Build the table and replace the element
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}

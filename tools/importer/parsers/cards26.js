/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, multiple rows
  // First row: block name
  // Each subsequent row: [image, text content (heading + description)]

  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Find all card containers (direct children of the grid)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach(card => {
    // Find the first image in the card (mandatory)
    const img = card.querySelector('img');
    // Defensive: skip if no image
    if (!img) return;

    // Try to find the text content (h1-h6 + p)
    let heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    let description = card.querySelector('p');

    // Build the text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (description) textCell.appendChild(description);

    // Only add the row if we have at least image and some text (per block definition)
    if (img && (heading || description)) {
      rows.push([img, textCell]);
    } else if (img) {
      // If only image (no text), still add the row with empty string in text cell
      rows.push([img, '']);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

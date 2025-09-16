/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Header row for the block table
  const headerRow = ['Cards (cards6)'];
  const rows = [headerRow];

  // Get all immediate card containers (each card is a .utility-aspect-1x1 div)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image in the card
    const img = cardDiv.querySelector('img');
    if (!img) return; // Skip if no image (shouldn't happen in this block)
    // Per block spec, always 2 columns: image and text (even if text is empty)
    rows.push([
      img,
      ''
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

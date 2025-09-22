/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Get all card anchor elements (each card is an <a> block)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // --- IMAGE CELL ---
    // Find the image inside the first child div
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    let imageEl = null;
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      if (img) {
        // Reference the existing image element
        imageEl = img;
      }
    }

    // --- TEXT CELL ---
    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    // Title (h3)
    const title = card.querySelector('h3');

    // Compose text cell content
    const textContent = [];
    if (tagRow) textContent.push(tagRow);
    if (title) textContent.push(title);

    // Add the row to the table
    rows.push([
      imageEl || '',
      textContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: extract all card elements and their content
  const headerRow = ['Cards (cards10)'];

  // Select all card anchor elements (each card is an <a> with class 'card-link')
  const cardNodes = element.querySelectorAll('a.card-link');

  const rows = Array.from(cardNodes).map(card => {
    // --- IMAGE CELL ---
    // The image is always in the first child div.utility-aspect-3x2 of the card
    const imageDiv = card.querySelector('div.utility-aspect-3x2');
    // Reference the actual <img> element (do not clone)
    let imageEl = imageDiv ? imageDiv.querySelector('img') : '';

    // --- TEXT CELL ---
    // The text content is always in the div.utility-padding-all-1rem
    const textDiv = card.querySelector('div.utility-padding-all-1rem');
    // Defensive: if missing, create an empty div
    let textContent;
    if (textDiv) {
      // Reference the actual element (do not clone)
      textContent = textDiv;
    } else {
      textContent = document.createElement('div');
    }

    // Return the row for the table
    return [imageEl, textContent];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

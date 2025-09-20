/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Cards (cards24)'];

  // Defensive: find the card image and text content
  // The structure is: element > div > div.card > div.card-body > (div.h4-heading, img)
  let cardImage = null;
  let cardTitle = null;
  let cardDescription = null;

  // Find the deepest card-body
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Find image
    cardImage = cardBody.querySelector('img');
    // Find title
    cardTitle = cardBody.querySelector('.h4-heading');
    // If there is more text, it would be here, but in this HTML, only heading is present
    // For demo, we'll use only the heading as text content
  }

  // Compose the text cell: heading (as is)
  const textCell = cardTitle ? cardTitle : '';

  // Compose the table rows
  const rows = [headerRow];
  rows.push([
    cardImage || '',
    textCell || ''
  ]);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

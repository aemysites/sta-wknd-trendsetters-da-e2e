/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block requirements
  const headerRow = ['Cards (cards24)'];

  // Defensive: Find the card body (where image and text live)
  // The structure is: element > div > div.card > div.card-body
  let cardBody = null;
  const divs = element.querySelectorAll(':scope > div');
  for (const div of divs) {
    // Look for card-body inside the nested structure
    cardBody = div.querySelector('.card-body');
    if (cardBody) break;
  }
  if (!cardBody) {
    // If not found, fallback to the element itself
    cardBody = element;
  }

  // Get image (mandatory)
  const img = cardBody.querySelector('img');

  // Get title (optional, styled as heading)
  const heading = cardBody.querySelector('.h4-heading');

  // Get description (optional, below heading)
  // In this HTML, there is no description, but the heading acts as the main text
  // If there were more text, it would be in another element after heading
  // For this example, only heading is present

  // Compose the text cell
  const textCellElements = [];
  if (heading) textCellElements.push(heading);
  // If there were a description, add it here

  // Compose the table rows
  const rows = [headerRow];
  rows.push([
    img || '',
    textCellElements.length ? textCellElements : '',
  ]);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

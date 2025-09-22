/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name and variant in the header row
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Defensive: get all immediate child divs (each is a card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains: icon div, then a <p> with the description
    // We want only the text content (no icons/images)
    // Find the first <p> inside cardDiv
    const description = cardDiv.querySelector('p');
    if (description) {
      // Place the <p> directly in the cell
      rows.push([description]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}

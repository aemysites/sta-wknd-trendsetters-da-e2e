/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards14) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards14)'];
  const rows = [headerRow];

  // Select all card links (each card is an <a> element)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // --- Image (first cell) ---
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    let imageEl = null;
    if (imgContainer) {
      // Reference the actual image element from the DOM (do not clone)
      imageEl = imgContainer.querySelector('img');
    }

    // --- Text content (second cell) ---
    // Tag and date (horizontal bar)
    const tagBar = card.querySelector('.flex-horizontal');
    // Heading/title
    const heading = card.querySelector('h3, .h4-heading');
    // Compose text cell: preserve semantic meaning and all text
    const textCellContent = [];
    if (tagBar) textCellContent.push(tagBar);
    if (heading) textCellContent.push(heading);

    // Ensure all text content is included, even if missing elements
    if (textCellContent.length === 0 && card.textContent.trim()) {
      textCellContent.push(document.createTextNode(card.textContent.trim()));
    }

    // Add the card row (image, text)
    rows.push([imageEl, textCellContent]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: extract each card's image, tag/date, and title
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is an <a> block)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Image: always in the first child div with an <img>
    const imageContainer = card.querySelector('div.utility-aspect-2x3');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Text content: tag/date row + title
    const textFragments = [];

    // Tag/date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      textFragments.push(tagRow);
    }

    // Title (h3)
    const title = card.querySelector('h3');
    if (title) {
      textFragments.push(title);
    }

    // Assemble row: [image, text content]
    rows.push([
      img || '',
      textFragments
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: extract cards from grid layout
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card links (each card is an <a> element)
  const cardLinks = element.querySelectorAll('a.card-link');

  cardLinks.forEach((card) => {
    // Image: find the first img inside the card (reference, do not clone)
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const textFragments = [];
    if (textContainer) {
      // Tag (optional)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        // Only reference the tagGroup, do not clone
        textFragments.push(tagGroup);
      }
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textFragments.push(heading);
      }
      // Paragraph (description)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textFragments.push(desc);
      }
    }
    // Add row: [image, text content]
    rows.push([
      img || '',
      textFragments.length > 0 ? textFragments : ''
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

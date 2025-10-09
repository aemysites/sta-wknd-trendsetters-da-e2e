/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block: extract each card's image and text content
  // Header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all anchor tags representing cards
  const cardSelector = 'a.card-link';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach((card) => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageDiv) {
      // Reference the actual image element from the DOM
      const img = imageDiv.querySelector('img');
      if (img) imageEl = img;
    }

    // Text content: second child div
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (contentDiv) {
      // Tag (optional)
      const tagGroup = contentDiv.querySelector('.tag-group');
      if (tagGroup) {
        // Reference the tag group as-is for semantic preservation
        textContent.push(tagGroup);
      }
      // Heading (optional)
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textContent.push(heading);
      }
      // Description (optional)
      const desc = contentDiv.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }

    // Each row: [image, textContent]
    rows.push([
      imageEl || '',
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Find all card links (each card is an <a> with class 'card-link')
  const cardLinks = element.querySelectorAll('a.card-link');

  cardLinks.forEach(card => {
    // Image: first .utility-aspect-3x2 inside the card
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageContainer) {
      imageEl = imageContainer.querySelector('img');
    }

    // Text content: the .utility-padding-all-1rem inside the card
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional)
      const tag = textContainer.querySelector('.tag');
      if (tag) {
        textContent.push(tag);
      }
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }

    // Each row: [image, text content]
    rows.push([
      imageEl ? imageEl : '',
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

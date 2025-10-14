/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block parser
  // 1. Header row
  const headerRow = ['Cards (cards10)'];

  // 2. Find all card instances (each <a.card-link>)
  const cardSelector = '.card-link';
  const cards = Array.from(element.querySelectorAll(cardSelector));

  // 3. Build table rows for each card
  const rows = cards.map(card => {
    // Image: always present, first cell
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Text content: second cell
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional, styled as badge)
      const tag = textContainer.querySelector('.tag');
      if (tag) textContent.push(tag);
      // Heading (optional)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) textContent.push(heading);
      // Description (optional)
      const desc = textContainer.querySelector('p');
      if (desc) textContent.push(desc);
    }
    // Compose row: [image, textContent]
    return [img, textContent];
  });

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace original element
  element.replaceWith(table);
}

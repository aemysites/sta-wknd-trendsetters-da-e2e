/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block parser
  // 1. Header row
  const headerRow = ['Cards (cards10)'];

  // 2. Find all card elements (each <a.card-link>)
  const cardSelector = '.card-link';
  const cards = element.querySelectorAll(cardSelector);

  // 3. Build rows for each card
  const rows = Array.from(cards).map(card => {
    // Image: first .utility-aspect-3x2 img inside card
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Text content: tag, heading, paragraph
    const contentContainer = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (contentContainer) {
      // Tag (badge)
      const tag = contentContainer.querySelector('.tag');
      if (tag) textContent.push(tag);
      // Heading
      const heading = contentContainer.querySelector('h3, .h4-heading');
      if (heading) textContent.push(heading);
      // Description
      const desc = contentContainer.querySelector('p');
      if (desc) textContent.push(desc);
    }

    // Each row: [image, textContent]
    return [img, textContent];
  });

  // 4. Assemble table rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element
  element.replaceWith(table);
}

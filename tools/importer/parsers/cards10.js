/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, first row is header, subsequent rows are cards
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card elements (each is an <a> with class 'card-link')
  const cardSelector = 'a.card-link';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach(card => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    const img = imageDiv ? imageDiv.querySelector('img') : null;

    // Text content: second child div contains tag, heading, paragraph
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (contentDiv) {
      // Tag (optional, usually present)
      const tag = contentDiv.querySelector('.tag');
      if (tag) textContent.push(tag);
      // Heading (h3)
      const heading = contentDiv.querySelector('h3');
      if (heading) textContent.push(heading);
      // Description (p)
      const desc = contentDiv.querySelector('p');
      if (desc) textContent.push(desc);
    }
    // Add row: [image, textContent]
    rows.push([img, textContent]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, header row, each card = image + text
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all direct card anchors (each card is an <a>)
  const cardSelector = 'a.card-link';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach(card => {
    // Image: look for first img inside the card
    const img = card.querySelector('img');

    // Text content: tag, heading, paragraph (all inside the card)
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional, usually present)
      const tag = textContainer.querySelector('.tag');
      if (tag) textContent.push(tag);
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) textContent.push(heading);
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) textContent.push(desc);
    }
    // Each row: [image, text content]
    rows.push([
      img || '',
      textContent.length ? textContent : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

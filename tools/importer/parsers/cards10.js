/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card elements (each card is an <a> with class 'card-link')
  const cardSelector = 'a.card-link';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach(card => {
    // First column: image (reference the existing <img> element)
    const img = card.querySelector('img');
    const imageCell = img || '';

    // Second column: text content (preserve tag, heading, and description)
    const tag = card.querySelector('.tag');
    const title = card.querySelector('h3');
    const desc = card.querySelector('p');

    // Compose text cell as an array of referenced nodes (preserving semantics)
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (title) textCellContent.push(title);
    if (desc) textCellContent.push(desc);

    rows.push([
      imageCell,
      textCellContent
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

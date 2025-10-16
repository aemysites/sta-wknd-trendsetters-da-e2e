/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, first row is header, each subsequent row is a card
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Find all card elements (each is an <a> with class 'card-link')
  const cardSelector = 'a.card-link';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach(card => {
    // --- Image cell ---
    // Find the image inside the card
    const img = card.querySelector('img');
    // Defensive: If no image, skip this card
    if (!img) return;

    // --- Text cell ---
    // Find the tag (category label)
    const tag = card.querySelector('.tag');
    // Find the heading
    const heading = card.querySelector('h3, .h4-heading');
    // Find the description
    const desc = card.querySelector('p');

    // Compose the text cell
    const textCell = document.createElement('div');
    if (tag) {
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tag);
      textCell.appendChild(tagDiv);
    }
    if (heading) {
      textCell.appendChild(heading);
    }
    if (desc) {
      textCell.appendChild(desc);
    }

    // Each row: [image, text content]
    rows.push([img, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

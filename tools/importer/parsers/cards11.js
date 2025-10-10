/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards11) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Select all card anchors (each card is an <a> with class 'utility-link-content-block')
  const cardSelector = 'a.utility-link-content-block';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach(card => {
    // --- IMAGE ---
    // Reference the image element directly from the source
    const img = card.querySelector('img');

    // --- TEXT CONTENT ---
    // Tag (category label)
    const tag = card.querySelector('.tag');
    // Date
    const date = card.querySelector('.paragraph-sm');
    // Title (heading)
    const heading = card.querySelector('h3, .h4-heading');

    // Compose text cell
    const textCell = document.createElement('div');
    if (tag || date) {
      const metaRow = document.createElement('div');
      metaRow.style.display = 'flex';
      metaRow.style.gap = '0.5em';
      if (tag) metaRow.appendChild(tag);
      if (date) metaRow.appendChild(date);
      textCell.appendChild(metaRow);
    }
    if (heading) {
      textCell.appendChild(heading);
    }

    // Add card row: [image, text content]
    rows.push([img, textCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

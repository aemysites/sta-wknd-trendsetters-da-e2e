/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with block name
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Select all card anchor elements (each card is an <a>)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach(card => {
    // --- IMAGE ---
    // Find the image inside the card
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    let imageEl = imgWrapper ? imgWrapper.querySelector('img') : null;

    // --- TEXT CONTENT ---
    // Tag and date (in flex-horizontal)
    const tagDateRow = card.querySelector('.flex-horizontal');
    let tag = null, date = null;
    if (tagDateRow) {
      tag = tagDateRow.querySelector('.tag');
      date = tagDateRow.querySelector('.paragraph-sm');
    }

    // Title (h3)
    const heading = card.querySelector('h3');

    // Build text cell content
    const textCell = document.createElement('div');
    // Tag/date row
    if (tag || date) {
      const tagDateDiv = document.createElement('div');
      if (tag) tagDateDiv.appendChild(tag.cloneNode(true));
      if (date) tagDateDiv.appendChild(date.cloneNode(true));
      textCell.appendChild(tagDateDiv);
    }
    // Heading
    if (heading) textCell.appendChild(heading.cloneNode(true));

    // Wrap text cell in anchor to preserve link (CTA)
    const link = card.getAttribute('href');
    let textCellFinal = textCell;
    if (link) {
      const a = document.createElement('a');
      a.href = link;
      a.appendChild(textCell);
      textCellFinal = a;
    }

    rows.push([
      imageEl ? imageEl.cloneNode(true) : '',
      textCellFinal
    ]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

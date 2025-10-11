/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards12)'];

  // 2. Find all card elements (each <a.utility-link-content-block>)
  const cardSelector = 'a.utility-link-content-block';
  const cards = Array.from(element.querySelectorAll(cardSelector));

  // 3. Parse each card
  const rows = cards.map(card => {
    // Image: always first child div with an <img>
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Tag and date: horizontal flex container
    const tagRow = card.querySelector('.flex-horizontal');
    let tag = null, date = null;
    if (tagRow) {
      const tagEl = tagRow.querySelector('.tag');
      const dateEl = tagRow.querySelector('.paragraph-sm');
      tag = tagEl ? tagEl.cloneNode(true) : null;
      date = dateEl ? dateEl.cloneNode(true) : null;
    }

    // Title: h3.h4-heading
    const titleEl = card.querySelector('h3.h4-heading');
    const title = titleEl ? titleEl.cloneNode(true) : null;

    // Compose text cell: tag + date (inline), then title (block)
    const textCell = document.createElement('div');
    // Tag/date row
    if (tag || date) {
      const tagDateRow = document.createElement('div');
      tagDateRow.style.display = 'flex';
      tagDateRow.style.gap = '0.5em';
      if (tag) tagDateRow.appendChild(tag);
      if (date) tagDateRow.appendChild(date);
      textCell.appendChild(tagDateRow);
    }
    // Title
    if (title) textCell.appendChild(title);

    // Table row: [image, textCell]
    return [img, textCell];
  });

  // 4. Build table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace element with table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards12)'];

  // 2. Find all card links (each card is an <a> inside the grid container)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // 3. Build card rows
  const rows = cardLinks.map(card => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    const img = imageDiv ? imageDiv.querySelector('img') : null;

    // Tag and date: horizontal flex container
    const metaDiv = card.querySelector('.flex-horizontal');
    let tag = null;
    let date = null;
    if (metaDiv) {
      const tagDiv = metaDiv.querySelector('.tag');
      const dateDiv = metaDiv.querySelector('.paragraph-sm');
      tag = tagDiv ? tagDiv.cloneNode(true) : null;
      date = dateDiv ? dateDiv.cloneNode(true) : null;
    }

    // Title: h3 element
    const title = card.querySelector('h3');
    const titleEl = title ? title.cloneNode(true) : null;

    // Compose text cell: tag + date (horizontal), then title below
    // Use a fragment to preserve layout
    const textCell = document.createElement('div');
    if (tag || date) {
      const metaRow = document.createElement('div');
      metaRow.style.display = 'flex';
      metaRow.style.gap = '0.5em';
      if (tag) metaRow.appendChild(tag);
      if (date) metaRow.appendChild(date);
      textCell.appendChild(metaRow);
    }
    if (titleEl) {
      textCell.appendChild(titleEl);
    }

    // Card row: [image, text]
    return [img, textCell];
  });

  // 4. Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace original element
  element.replaceWith(table);
}

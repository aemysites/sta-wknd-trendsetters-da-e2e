/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Defensive: select all immediate <a> children (each is a card)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Find image (mandatory)
    const imageContainer = card.querySelector('.utility-aspect-2x3');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Find tag and date
    const metaRow = card.querySelector('.flex-horizontal');
    let metaFragments = [];
    if (metaRow) {
      // Tag
      const tag = metaRow.querySelector('.tag');
      if (tag) metaFragments.push(tag);
      // Date
      const date = metaRow.querySelector('.paragraph-sm');
      if (date) metaFragments.push(date);
    }

    // Find title (h3)
    const title = card.querySelector('h3');

    // Compose text cell: meta (tag/date), then title
    const textCell = [];
    if (metaFragments.length > 0) {
      // Wrap meta in a div for spacing
      const metaDiv = document.createElement('div');
      metaDiv.append(...metaFragments);
      textCell.push(metaDiv);
    }
    if (title) textCell.push(title);

    // Add row: [image, text]
    rows.push([
      img || '',
      textCell
    ]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

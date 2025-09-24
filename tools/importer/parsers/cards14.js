/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards14)'];
  const rows = [headerRow];

  // Defensive: select all immediate <a> children (each card)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  cards.forEach((card) => {
    // Find image container and image
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Compose text cell
    const textParts = [];

    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Defensive: get all direct children
      const tag = tagRow.querySelector('.tag');
      const date = tagRow.querySelector('.paragraph-sm');
      const tagDateDiv = document.createElement('div');
      if (tag) tagDateDiv.appendChild(tag);
      if (date) tagDateDiv.appendChild(date);
      textParts.push(tagDateDiv);
    }

    // Heading
    const heading = card.querySelector('h3');
    if (heading) {
      textParts.push(heading);
    }

    // Compose row: [image, text cell]
    rows.push([
      img || '',
      textParts.length > 0 ? textParts : ''
    ]);
  });

  // Create block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

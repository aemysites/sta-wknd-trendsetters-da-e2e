/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card links (direct children)
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');

  // Table header row as specified
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  cardLinks.forEach((card) => {
    // Get image element (reference, not clone)
    const imgContainer = card.querySelector(':scope > div.utility-aspect-2x3');
    const img = imgContainer ? imgContainer.querySelector('img') : '';

    // Get tag and date (reference, not clone)
    const tagRow = card.querySelector(':scope > div.flex-horizontal');
    const tag = tagRow ? tagRow.querySelector(':scope > div.tag') : null;
    const date = tagRow ? tagRow.querySelector(':scope > div.paragraph-sm') : null;

    // Get title (reference, not clone)
    const title = card.querySelector(':scope > h3');

    // Compose text cell: tag/date row (flex), then title
    const textCellContent = [];
    if (tag || date) {
      const metaDiv = document.createElement('div');
      metaDiv.style.display = 'flex';
      metaDiv.style.gap = '0.5em';
      if (tag) metaDiv.appendChild(tag);
      if (date) metaDiv.appendChild(date);
      textCellContent.push(metaDiv);
    }
    if (title) textCellContent.push(title);

    // Add row: [image, text]
    rows.push([
      img || '',
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards14) block: 2 columns, first row is header, each card is a row
  // Each card: [image, text content (tag, date, title)]

  // Header row as required
  const headerRow = ['Cards (cards14)'];

  // Find all card anchor elements (each card is an <a> inside the grid)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));
  
  // Build rows for each card
  const rows = cardLinks.map(card => {
    // Image: first child div contains the image
    const imageContainer = card.querySelector('.utility-aspect-2x3');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Tag/date bar: second child div (flex-horizontal)
    const tagBar = card.querySelector('.flex-horizontal');
    let tagText = '', dateText = '';
    if (tagBar) {
      const tag = tagBar.querySelector('.tag');
      const date = tagBar.querySelector('.paragraph-sm');
      tagText = tag ? tag.textContent.trim() : '';
      dateText = date ? date.textContent.trim() : '';
    }
    // Title: h3.h4-heading
    const titleEl = card.querySelector('h3.h4-heading');
    // Compose text cell: tag/date bar + title
    // We'll preserve the tag/date bar as a flex group, then the title below
    const textCell = document.createElement('div');
    if (tagBar) {
      // Clone tagBar to preserve styling/structure
      textCell.appendChild(tagBar.cloneNode(true));
    }
    if (titleEl) {
      textCell.appendChild(titleEl.cloneNode(true));
    }
    // Output row: [image, text content]
    return [img, textCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}

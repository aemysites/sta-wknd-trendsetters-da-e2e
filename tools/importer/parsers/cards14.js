/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child anchor elements (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header as specified
  const headerRow = ['Cards (cards14)'];
  const rows = [headerRow];

  cards.forEach((card) => {
    // --- IMAGE ---
    // Find the image inside the card (always inside .utility-aspect-2x3)
    let imageContainer = card.querySelector('.utility-aspect-2x3');
    let img = imageContainer ? imageContainer.querySelector('img') : null;
    // Reference the existing image element (do not clone)
    let imageCell = img || '';

    // --- TEXT CONTENT ---
    // Tag and date (inside .flex-horizontal)
    let tagDateContainer = card.querySelector('.flex-horizontal');
    let tag = tagDateContainer ? tagDateContainer.querySelector('.tag') : null;
    let date = tagDateContainer ? tagDateContainer.querySelector('.paragraph-sm') : null;

    // Heading (h3 or .h4-heading)
    let heading = card.querySelector('h3, .h4-heading');

    // Compose the text cell
    const textCellContent = document.createElement('div');
    // Tag/date row (if present)
    if (tag || date) {
      const tagDateDiv = document.createElement('div');
      if (tag) tagDateDiv.appendChild(tag);
      if (date) tagDateDiv.appendChild(date);
      textCellContent.appendChild(tagDateDiv);
    }
    // Heading (if present)
    if (heading) textCellContent.appendChild(heading);

    rows.push([
      imageCell,
      textCellContent.childNodes.length ? textCellContent : ''
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

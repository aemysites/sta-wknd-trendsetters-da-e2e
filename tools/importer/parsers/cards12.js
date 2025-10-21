/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Select all card anchor elements (each card is an <a> inside the grid container)
  const cardAnchors = element.querySelectorAll('a.utility-link-content-block');

  cardAnchors.forEach((card) => {
    // --- Image cell ---
    // Find the image inside the card (should be in the first child div)
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    let imgEl = imgDiv ? imgDiv.querySelector('img') : null;
    // Defensive: if no image found, leave cell empty
    const imageCell = imgEl ? imgEl : '';

    // --- Text cell ---
    // Tag and date (inside flex-horizontal)
    const tagDateDiv = card.querySelector('.flex-horizontal');
    let tagEl = tagDateDiv ? tagDateDiv.querySelector('.tag') : null;
    let dateEl = tagDateDiv ? tagDateDiv.querySelector('.paragraph-sm') : null;

    // Title (h3 or h4)
    let titleEl = card.querySelector('h3, h4');

    // Compose text cell: tag, date, title (in order, as in screenshot)
    const textCellContent = [];
    if (tagEl) textCellContent.push(tagEl);
    if (dateEl) textCellContent.push(dateEl);
    if (titleEl) textCellContent.push(titleEl);

    rows.push([imageCell, textCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

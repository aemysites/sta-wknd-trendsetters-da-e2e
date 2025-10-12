/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: 2 columns, first row is header, following rows are [image, text content]
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Find all card links (each card is an <a> inside the grid container)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach(card => {
    // --- Image cell ---
    // The image is inside a div, which is the first child of the card
    const imageContainer = card.querySelector('div.utility-aspect-2x3');
    let imageEl = null;
    if (imageContainer) {
      imageEl = imageContainer.querySelector('img');
    }

    // --- Text cell ---
    // Tag and date are in a flex-horizontal div, then the h3 heading
    const tagDateDiv = card.querySelector('div.flex-horizontal');
    let tagEl = null, dateEl = null;
    if (tagDateDiv) {
      const tag = tagDateDiv.querySelector('.tag');
      if (tag) tagEl = tag;
      const date = tagDateDiv.querySelector('.paragraph-sm');
      if (date) dateEl = date;
    }
    const heading = card.querySelector('h3');

    // Compose the text cell: tag/date (on one line), then heading
    const textCellContent = [];
    if (tagEl || dateEl) {
      const metaDiv = document.createElement('div');
      if (tagEl) metaDiv.appendChild(tagEl);
      if (dateEl) metaDiv.appendChild(dateEl);
      textCellContent.push(metaDiv);
    }
    if (heading) textCellContent.push(heading);

    // Add the row: [image, text content]
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

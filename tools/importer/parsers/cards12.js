/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Select all card anchor elements (each card is an <a> inside the grid)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('div.utility-aspect-2x3');
    let imageEl = null;
    if (imageDiv) {
      // Reference the existing image element, do not clone
      imageEl = imageDiv.querySelector('img');
    }

    // Text content: tag + date + heading
    // Tag and date are inside the flex-horizontal div
    const tagDateDiv = card.querySelector('div.flex-horizontal');
    let tagEl = null;
    let dateEl = null;
    if (tagDateDiv) {
      const tag = tagDateDiv.querySelector('.tag');
      if (tag) tagEl = tag;
      const date = tagDateDiv.querySelector('.paragraph-sm');
      if (date) dateEl = date;
    }
    // Heading
    const heading = card.querySelector('h3');

    // Compose text cell content: tag, date, heading
    const textCellContent = [];
    if (tagEl || dateEl) {
      const tagDateWrapper = document.createElement('div');
      if (tagEl) tagDateWrapper.appendChild(tagEl);
      if (dateEl) tagDateWrapper.appendChild(dateEl);
      textCellContent.push(tagDateWrapper);
    }
    if (heading) textCellContent.push(heading);

    // Add the row: [image, text content]
    rows.push([
      imageEl || '',
      textCellContent
    ]);
  });

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: 2 columns, first row is header, each row = 1 card (image, then text)
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is an <a> inside the grid container)
  const cardAnchors = element.querySelectorAll('a.utility-link-content-block');

  cardAnchors.forEach((card) => {
    // Get the card's href
    const href = card.getAttribute('href');
    // Image: first child div contains the image
    const imageDiv = card.querySelector('div.utility-aspect-2x3');
    let imageEl = null;
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      imageEl = img ? img.cloneNode(true) : '';
    } else {
      imageEl = '';
    }

    // Text content: tag, date, and heading
    const tagRow = card.querySelector('.flex-horizontal');
    const heading = card.querySelector('h3, .h4-heading');

    // Compose text cell: tag/date row + heading
    const textCellContent = [];
    if (tagRow) textCellContent.push(tagRow.cloneNode(true));
    if (heading) textCellContent.push(heading.cloneNode(true));

    // Wrap image and text in anchor if href exists
    let imageCell = imageEl;
    let textCell = textCellContent.length ? textCellContent : '';
    if (href) {
      const aImg = document.createElement('a');
      aImg.href = href;
      if (imageEl) aImg.appendChild(imageEl);
      imageCell = aImg;

      const aText = document.createElement('a');
      aText.href = href;
      if (Array.isArray(textCell)) {
        textCell.forEach((el) => aText.appendChild(el));
      } else if (textCell) {
        aText.appendChild(textCell);
      }
      textCell = aText;
    }

    rows.push([
      imageCell,
      textCell
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

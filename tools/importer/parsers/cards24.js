/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Select all card links
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Image: first child div > img
    const imageDiv = card.querySelector(':scope > div');
    const img = imageDiv ? imageDiv.querySelector('img') : null;

    // Tag & Date: second child div
    const metaDiv = card.querySelector('.flex-horizontal');
    let metaRow = '';
    if (metaDiv) {
      // Compose tag and date as a single row
      const tag = metaDiv.querySelector('.tag');
      const date = metaDiv.querySelector('.paragraph-sm');
      const metaRowDiv = document.createElement('div');
      if (tag) metaRowDiv.appendChild(tag);
      if (date) metaRowDiv.appendChild(date);
      metaRow = metaRowDiv;
    }

    // Heading: h3
    const heading = card.querySelector('h3');

    // Compose text cell
    const textCell = [];
    if (metaRow) textCell.push(metaRow);
    if (heading) textCell.push(heading);

    // Add row: [image, text]
    rows.push([
      img || '',
      textCell.length === 1 ? textCell[0] : textCell
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all immediate card divs
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Defensive: find icon image (first img inside .icon)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Defensive: find the text paragraph (first p)
    let textContent = null;
    textContent = cardDiv.querySelector('p');

    // Build the row: icon in first cell, text in second cell
    const row = [
      iconImg || '',
      textContent || '',
    ];
    rows.push(row);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

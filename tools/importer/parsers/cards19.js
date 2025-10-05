/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all immediate card containers
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Defensive: find the icon/image (first .icon img inside)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Defensive: find the text content (first <p> inside)
    let textContent = null;
    textContent = cardDiv.querySelector('p');

    // Build the row: icon/image in first cell, text in second cell
    // If either is missing, fallback to empty string
    rows.push([
      iconImg || '',
      textContent || ''
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

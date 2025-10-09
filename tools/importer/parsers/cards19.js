/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all direct child card elements (each card is a flex-horizontal div)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // Icon: find the first img inside a .icon div
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Text: find the first paragraph and extract only its textContent
    let textContent = '';
    const p = cardDiv.querySelector('p');
    if (p) {
      textContent = p.textContent.trim();
    }
    // Build row: icon (img element) in first cell, plain text in second cell
    rows.push([
      iconImg || '',
      textContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}

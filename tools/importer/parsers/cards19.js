/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all card elements: each direct child div is a card
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // Icon: look for .icon img inside the card
    const iconDiv = cardDiv.querySelector('.icon');
    let iconImg = null;
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Text: look for the first <p> inside the card
    const textP = cardDiv.querySelector('p');
    // Build the row: icon in first cell, text in second
    const row = [
      iconImg || '',
      textP || '',
    ];
    rows.push(row);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

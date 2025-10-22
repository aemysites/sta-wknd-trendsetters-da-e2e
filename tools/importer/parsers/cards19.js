/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all direct card containers (each card is a flex-horizontal)
  const cardDivs = Array.from(element.querySelectorAll('.flex-horizontal'));

  cardDivs.forEach(card => {
    // Icon: find the first img inside .icon
    const iconDiv = card.querySelector('.icon');
    let iconImg = iconDiv ? iconDiv.querySelector('img') : null;
    // Defensive: if no img, use iconDiv itself, else null
    let iconCell = iconImg ? iconImg : (iconDiv ? iconDiv : document.createTextNode(''));

    // Text: find the first <p> inside the card
    const textP = card.querySelector('p');
    let textCell = textP ? textP : document.createTextNode('');

    rows.push([iconCell, textCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

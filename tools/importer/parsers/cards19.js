/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, first row is header, each subsequent row is a card
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all direct child card containers (each card is a flex-horizontal div)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach(cardDiv => {
    // Find icon image (SVG)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Text is the <p> with class 'utility-margin-bottom-0'
    const textP = cardDiv.querySelector('p.utility-margin-bottom-0');
    let textContent = '';
    if (textP) {
      textContent = textP.textContent.trim();
    }
    // Compose row: [icon, plain text]
    rows.push([
      iconImg || '',
      textContent
    ]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}

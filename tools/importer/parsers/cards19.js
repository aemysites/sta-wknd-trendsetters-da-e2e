/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Each card is a direct child div of the main container
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // The icon is the first descendant with class 'icon', containing an <img>
    const iconDiv = cardDiv.querySelector('.icon');
    let image = null;
    if (iconDiv) {
      image = iconDiv.querySelector('img');
    }
    // Only extract the <p> element for text content (ignore empty divs)
    const textEl = cardDiv.querySelector('p');
    if (image && textEl) {
      rows.push([image, textEl.outerHTML]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

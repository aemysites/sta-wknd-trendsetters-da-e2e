/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards27) block header row
  const headerRow = ['Cards (cards27)'];
  const rows = [headerRow];

  // Get all direct children that are cards (contain an image)
  const cardDivs = Array.from(element.children).filter(div => div.querySelector('img'));

  cardDivs.forEach(cardDiv => {
    // Reference the image element directly
    const img = cardDiv.querySelector('img');
    // Find text container (contains h3 and p)
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    let textCell;
    if (textContainer) {
      // Create a fragment to preserve all text content (not just h3/p)
      const frag = document.createDocumentFragment();
      Array.from(textContainer.childNodes).forEach(node => {
        frag.appendChild(node.cloneNode(true));
      });
      textCell = frag.childNodes.length ? frag : '';
    } else {
      textCell = '';
    }
    rows.push([img, textCell]);
  });

  // Build the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Select all card anchor elements (each is a card)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Find image (mandatory, always present)
    const img = card.querySelector('img');
    const imageCell = img ? img.cloneNode(true) : '';

    // Find the main content container (the div after the image)
    let contentDiv = null;
    let foundImg = false;
    for (const child of card.children) {
      if (child.tagName === 'IMG') {
        foundImg = true;
      } else if (foundImg && child.tagName === 'DIV') {
        contentDiv = child;
        break;
      }
    }
    if (!contentDiv) return;

    // Compose the text cell as a single div containing all text content (including nested)
    // Use innerText to ensure all visible text is included, including line breaks
    const textCell = document.createElement('div');
    textCell.innerText = contentDiv.innerText;

    // Add the row
    rows.push([imageCell, textCell]);
  });

  // Replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

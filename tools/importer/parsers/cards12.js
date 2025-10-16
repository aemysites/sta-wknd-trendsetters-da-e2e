/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is an <a>)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach(card => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    const img = imageDiv ? imageDiv.querySelector('img') : null;

    // Text content cell
    const textContent = document.createElement('div');
    textContent.style.display = 'flex';
    textContent.style.flexDirection = 'column';

    // Tag and date (horizontal row)
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      textContent.appendChild(tagRow);
    }

    // Title (h3)
    const heading = card.querySelector('h3');
    if (heading) {
      textContent.appendChild(heading);
    }

    // No description or CTA in this example
    // If there were, we could add them here

    // Add row: [img, textContent]
    rows.push([img, textContent]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

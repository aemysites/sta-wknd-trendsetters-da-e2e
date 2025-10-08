/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: header row must be a single cell
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Get all direct child divs (each card or image block)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // Find image (mandatory)
    const img = cardDiv.querySelector('img');

    // Find text content (optional)
    let textContent = null;
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      const cellContent = [];
      const heading = textContainer.querySelector('h3, h2, h1');
      if (heading) cellContent.push(heading);
      const desc = textContainer.querySelector('p');
      if (desc) cellContent.push(desc);
      textContent = cellContent.length ? cellContent : '';
    } else {
      textContent = '';
    }

    // Only add row if image exists
    if (img) {
      rows.push([
        img,
        textContent
      ]);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

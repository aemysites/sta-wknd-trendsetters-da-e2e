/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: extract each card's image and text content

  // Table header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is an <a> in the grid)
  const cardAnchors = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  cardAnchors.forEach((cardAnchor) => {
    // Find image (mandatory, always first cell)
    const img = cardAnchor.querySelector('img');

    // Find the card's content container (the div after the img)
    const cardContentDiv = img.nextElementSibling;

    // Compose the text cell content
    const textContent = [];

    // Tag and read time (grouped horizontally)
    const tagRow = cardContentDiv.querySelector('.flex-horizontal');
    if (tagRow) {
      // Tag (badge/pill)
      const tag = tagRow.querySelector('.tag');
      if (tag) textContent.push(tag);
      // Read time (small text)
      const readTime = tagRow.querySelector('.paragraph-sm');
      if (readTime) textContent.push(readTime);
    }

    // Title (h3)
    const title = cardContentDiv.querySelector('h3');
    if (title) textContent.push(title);

    // Description (p)
    const desc = cardContentDiv.querySelector('p');
    if (desc) textContent.push(desc);

    // Call-to-action ("Read") - usually a div at the bottom
    // If present, wrap it in a link to the card's href
    const ctaDivs = Array.from(cardContentDiv.querySelectorAll('div'));
    let cta;
    ctaDivs.forEach((div) => {
      if (div.textContent.trim().toLowerCase() === 'read') {
        cta = document.createElement('a');
        cta.href = cardAnchor.href;
        cta.textContent = 'Read';
        textContent.push(cta);
      }
    });

    // Add the card row: [image, text content]
    rows.push([img, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}

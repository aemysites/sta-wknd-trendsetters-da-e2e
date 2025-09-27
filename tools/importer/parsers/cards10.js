/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Cards (cards10)'];

  // Get all direct card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  const rows = [headerRow];

  cards.forEach(card => {
    // Find the image (first .utility-aspect-3x2 > img)
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }

    // Find the text content wrapper
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    let textContent = document.createElement('div');
    if (textWrapper) {
      // Tag (optional, above heading)
      const tag = textWrapper.querySelector('.tag');
      if (tag) {
        const tagDiv = document.createElement('div');
        tagDiv.appendChild(tag.cloneNode(true));
        textContent.appendChild(tagDiv);
      }
      // Heading (h3)
      const heading = textWrapper.querySelector('h3');
      if (heading) {
        textContent.appendChild(heading.cloneNode(true));
      }
      // Description (p)
      const desc = textWrapper.querySelector('p');
      if (desc) {
        textContent.appendChild(desc.cloneNode(true));
      }
      // Call-to-action: if card is a link and not just #, add a CTA at the bottom
      // Not present in this HTML, so omitted.
    }

    // Compose the row: [image, text content]
    rows.push([
      img ? img : '',
      textContent
    ]);
  });

  // Build the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

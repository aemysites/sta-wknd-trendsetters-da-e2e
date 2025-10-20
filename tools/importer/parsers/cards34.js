/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, first row is header, each subsequent row is a card
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is an <a> direct child of the grid)
  const cardAnchors = element.querySelectorAll('a.utility-link-content-block');

  cardAnchors.forEach((card) => {
    // Image: first <img> inside the card
    const img = card.querySelector('img');

    // Text content container: the div after the image
    const contentDiv = img && img.nextElementSibling;
    let textContent = [];
    if (contentDiv) {
      // Tag and read time (first flex-horizontal div)
      const tagRow = contentDiv.querySelector('.flex-horizontal');
      if (tagRow) {
        textContent.push(tagRow.cloneNode(true));
      }
      // Title (h3)
      const h3 = contentDiv.querySelector('h3');
      if (h3) {
        textContent.push(h3.cloneNode(true));
      }
      // Description (p)
      const desc = contentDiv.querySelector('p');
      if (desc) {
        textContent.push(desc.cloneNode(true));
      }
      // CTA (last div with text 'Read')
      // Find all divs, pick the one whose text is 'Read'
      const ctaDivs = Array.from(contentDiv.querySelectorAll('div'));
      const ctaDiv = ctaDivs.find(div => div.textContent.trim() === 'Read');
      if (ctaDiv) {
        // Wrap CTA in a link if the card anchor has an href
        if (card.href) {
          const ctaLink = document.createElement('a');
          ctaLink.href = card.href;
          ctaLink.appendChild(ctaDiv.cloneNode(true));
          textContent.push(ctaLink);
        } else {
          textContent.push(ctaDiv.cloneNode(true));
        }
      }
    }

    // Build row: [image, text content]
    rows.push([
      img ? img : '',
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

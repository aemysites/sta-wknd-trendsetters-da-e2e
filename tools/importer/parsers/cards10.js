/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each card-link
  function extractCardContent(cardLink) {
    // Get image (first .utility-aspect-3x2 img)
    const imgWrapper = cardLink.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }

    // Get text content (inside .utility-padding-all-1rem)
    const textWrapper = cardLink.querySelector('.utility-padding-all-1rem');
    let tag = null;
    let heading = null;
    let desc = null;
    let cta = null;

    if (textWrapper) {
      // Tag (optional)
      const tagDiv = textWrapper.querySelector('.tag');
      if (tagDiv) {
        tag = tagDiv.cloneNode(true);
      }
      // Heading (h3)
      const h3 = textWrapper.querySelector('h3');
      if (h3) {
        heading = h3.cloneNode(true);
      }
      // Description (p)
      const p = textWrapper.querySelector('p');
      if (p) {
        desc = p.cloneNode(true);
      }
    }

    // CTA: if the card-link has an href and it's not just '#', and not the homepage
    if (cardLink.href && cardLink.getAttribute('href') && cardLink.getAttribute('href') !== '#' && cardLink.getAttribute('href') !== '/') {
      cta = document.createElement('a');
      cta.href = cardLink.getAttribute('href');
      cta.textContent = 'Learn more';
    }

    // Compose text cell: tag (optional), heading, desc, cta (optional)
    const textCell = document.createElement('div');
    if (tag) {
      textCell.appendChild(tag);
    }
    if (heading) {
      textCell.appendChild(heading);
    }
    if (desc) {
      textCell.appendChild(desc);
    }
    if (cta) {
      textCell.appendChild(cta);
    }

    return [img, textCell];
  }

  // Get all direct card links
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards10)']);
  // Card rows
  cardLinks.forEach((cardLink) => {
    const [img, textCell] = extractCardContent(cardLink);
    rows.push([img, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

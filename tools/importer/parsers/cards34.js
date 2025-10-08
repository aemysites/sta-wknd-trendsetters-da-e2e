/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards34)'];

  // 2. Find all card elements (each card is an <a> direct child of the main grid)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // 3. Parse each card
  const rows = cardLinks.map(card => {
    // Image: first img inside card
    const img = card.querySelector('img');

    // Extract card fields for semantic structure
    const tag = card.querySelector('.tag div');
    const readTime = card.querySelector('.paragraph-sm');
    const heading = card.querySelector('h3');
    const description = card.querySelector('p');
    // Find the 'Read' CTA (the last div inside the content area)
    let cta = null;
    const contentDivs = card.querySelectorAll('div');
    for (let i = contentDivs.length - 1; i >= 0; i--) {
      if (contentDivs[i].textContent.trim() === 'Read') {
        cta = contentDivs[i];
        break;
      }
    }

    // Compose text cell with semantic structure
    const textCell = document.createElement('div');
    if (tag || readTime) {
      const meta = document.createElement('div');
      if (tag) {
        meta.appendChild(tag.cloneNode(true));
      }
      if (readTime) {
        meta.appendChild(readTime.cloneNode(true));
      }
      textCell.appendChild(meta);
    }
    if (heading) textCell.appendChild(heading.cloneNode(true));
    if (description) textCell.appendChild(description.cloneNode(true));
    if (cta) textCell.appendChild(cta.cloneNode(true));

    return [img, textCell];
  });

  // 4. Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace element
  element.replaceWith(table);
}

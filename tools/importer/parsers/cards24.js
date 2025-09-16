/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards24)'];
  const cells = [headerRow];

  // Get all direct card links
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Image: find first img inside the card
    const imgContainer = card.querySelector(':scope > div');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Text content: build a container
    const textContent = document.createElement('div');

    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      textContent.append(tagRow);
    }

    // Title (h3)
    const heading = card.querySelector('h3');
    if (heading) {
      textContent.append(heading);
    }

    // Add row: [image, textContent]
    cells.push([
      img ? img : '',
      textContent
    ]);
  });

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

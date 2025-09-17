/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.querySelectorAll) return;

  // Table header row: block name and variant
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each card is a direct child <a>
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Image: always in the first child div > img
    const imgDiv = card.querySelector(':scope > div');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Meta: tag and date, in .flex-horizontal
    const metaDiv = card.querySelector('.flex-horizontal');
    let metaContent = [];
    if (metaDiv) {
      // Use the actual DOM nodes for tag and date
      metaContent = Array.from(metaDiv.children);
    }

    // Heading: h3 or .h4-heading
    const heading = card.querySelector('h3, .h4-heading');

    // Compose text cell: meta (if present), then heading
    const textCell = [];
    if (metaContent.length) {
      const metaWrapper = document.createElement('div');
      metaContent.forEach(e => metaWrapper.appendChild(e));
      textCell.push(metaWrapper);
    }
    if (heading) textCell.push(heading);

    // Add row: [image, text cell]
    rows.push([
      img ? img : '',
      textCell.length === 1 ? textCell[0] : textCell,
    ]);
  });

  // Create the Cards (cards24) table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

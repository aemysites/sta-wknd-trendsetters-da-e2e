/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as per spec
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Each card is a direct child <a> of the grid
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Image cell: find the <img> inside the aspect wrapper
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imgWrapper) {
      imageEl = imgWrapper.querySelector('img');
    }

    // Text cell: gather tag, heading, description in order
    const contentWrapper = card.querySelector('.utility-padding-all-1rem');
    const textCellContent = [];
    if (contentWrapper) {
      // Tag (optional)
      const tagGroup = contentWrapper.querySelector('.tag-group');
      if (tagGroup) textCellContent.push(tagGroup);
      // Heading (mandatory)
      const heading = contentWrapper.querySelector('h3, .h4-heading');
      if (heading) textCellContent.push(heading);
      // Description (optional)
      const desc = contentWrapper.querySelector('p');
      if (desc) textCellContent.push(desc);
    }

    // Always provide something in each cell
    rows.push([
      imageEl || '',
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

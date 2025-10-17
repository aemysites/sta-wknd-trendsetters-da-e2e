/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all grid containers inside all tab panes
  const grids = element.querySelectorAll('.w-layout-grid');
  grids.forEach((grid) => {
    // Find all direct child anchors (each is a card)
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach((card) => {
      // Image: look for .cover-image inside card
      const img = card.querySelector('img.cover-image');
      // Text content: heading and description
      const heading = card.querySelector('h3.h4-heading');
      const desc = card.querySelector('.paragraph-sm');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Only add row if there is any text content
      if (heading || desc) {
        rows.push([img ? img : '', textCell]);
      }
    });
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}

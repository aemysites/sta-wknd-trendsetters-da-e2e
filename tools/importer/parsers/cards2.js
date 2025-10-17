/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards2) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Find the main grid containing all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct card containers (anchors)
  // The first child is a large card (contains .utility-link-content-block), then a nested grid for smaller cards
  const gridChildren = Array.from(grid.children);

  // Large card (left column)
  const largeCardAnchor = gridChildren.find(child => child.matches('a.utility-link-content-block'));
  if (largeCardAnchor) {
    // Image
    const imgContainer = largeCardAnchor.querySelector('.utility-aspect-2x3');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Text content
    const textContainer = largeCardAnchor.querySelector('.utility-padding-all-2rem');
    let textElements = [];
    if (textContainer) {
      // Heading
      const heading = textContainer.querySelector('h3');
      if (heading) textElements.push(heading);
      // Description
      const desc = textContainer.querySelector('p');
      if (desc) textElements.push(desc);
      // CTA (button)
      const cta = textContainer.querySelector('.button');
      if (cta) textElements.push(cta);
    }
    rows.push([
      img || '',
      textElements
    ]);
  }

  // Nested grid for smaller cards (right column)
  const nestedGrid = gridChildren.find(child => child.classList.contains('w-layout-grid'));
  if (nestedGrid) {
    // Each card is an anchor
    const cardAnchors = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
    cardAnchors.forEach(card => {
      // Image
      const imgContainer = card.querySelector('.utility-aspect-1x1, .utility-aspect-2x3');
      const img = imgContainer ? imgContainer.querySelector('img') : null;
      // Text content
      let textElements = [];
      // Heading
      const heading = card.querySelector('h3');
      if (heading) textElements.push(heading);
      // Description
      const desc = card.querySelector('p');
      if (desc) textElements.push(desc);
      rows.push([
        img || '',
        textElements
      ]);
    });
  }

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

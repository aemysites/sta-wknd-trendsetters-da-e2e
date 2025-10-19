/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards2) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Find the main grid container holding all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children that are card containers (anchor tags)
  // The first child is a large card (left column), the rest are inside a nested grid (right column)
  const cardElements = [];
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length > 0) {
    // First card (large, left column)
    const firstCard = gridChildren[0];
    if (firstCard.tagName === 'A') {
      cardElements.push(firstCard);
    }
    // Nested grid (right column)
    const nestedGrid = gridChildren[1];
    if (nestedGrid && nestedGrid.classList.contains('w-layout-grid')) {
      // Each card in the nested grid is an anchor
      cardElements.push(...Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block')));
    }
  }

  // For each card, extract image and text content
  cardElements.forEach(card => {
    // Find image (mandatory)
    const img = card.querySelector('img');
    // Find heading (h2 or h3 or h4)
    const heading = card.querySelector('h2, h3, h4');
    // Find description (first <p>)
    const desc = card.querySelector('p');
    // Find CTA (button or .button or anchor inside card)
    let cta = card.querySelector('.button, button');
    // If no CTA, check for anchor with text (but not the card itself)
    if (!cta) {
      // Avoid duplicating the card link
      const anchors = Array.from(card.querySelectorAll('a')).filter(a => a !== card);
      if (anchors.length > 0) cta = anchors[0];
    }

    // Build text cell: heading, description, CTA (if present)
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    // Add row: [image, text content]
    rows.push([
      img || '',
      textCell
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

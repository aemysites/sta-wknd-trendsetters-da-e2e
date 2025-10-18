/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract tag/label if present
  function extractTag(card) {
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      const tag = tagGroup.querySelector('.tag');
      if (tag) return tag;
    }
    return null;
  }

  // Helper to extract heading (h3 or h4)
  function extractHeading(card) {
    const h3 = card.querySelector('h3');
    if (h3) return h3;
    const h4 = card.querySelector('h4');
    if (h4) return h4;
    return null;
  }

  // Helper to extract description
  function extractDescription(card) {
    const desc = card.querySelector('p');
    if (desc) return desc;
    return null;
  }

  // Helper to build text cell
  function buildTextCell(card) {
    const cellContent = [];
    const tag = extractTag(card);
    if (tag) cellContent.push(tag);
    const heading = extractHeading(card);
    if (heading) cellContent.push(heading);
    const desc = extractDescription(card);
    if (desc) cellContent.push(desc);
    return cellContent;
  }

  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid
  const gridChildren = Array.from(grid.children);

  // First card: large hero card (first <a> child)
  const firstCard = gridChildren.find(child => child.matches && child.matches('a.utility-link-content-block'));

  // Next group: two cards with images and text (first .flex-horizontal)
  const flexGroups = gridChildren.filter(child => child.classList && child.classList.contains('flex-horizontal'));
  const imageCards = [];
  if (flexGroups[0]) {
    const flexCards = Array.from(flexGroups[0].children).filter(child => child.matches && child.matches('a.utility-link-content-block'));
    flexCards.forEach(card => {
      imageCards.push(card);
    });
  }

  // Next group: text-only cards separated by dividers (second .flex-horizontal)
  const textRows = [];
  if (flexGroups[1]) {
    const children = Array.from(flexGroups[1].children);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.matches && child.matches('a.utility-link-content-block')) {
        // No image, just text
        const textCell = buildTextCell(child);
        textRows.push(['', textCell]);
      }
      // If divider follows, add as a cell inside previous card's text cell
      if (child.classList && child.classList.contains('divider')) {
        // Attach divider to previous card's text cell
        if (textRows.length > 0) {
          const hr = document.createElement('hr');
          // Add to the last text cell array
          const lastRow = textRows[textRows.length - 1];
          if (Array.isArray(lastRow[1])) {
            lastRow[1].push(hr);
          } else {
            lastRow[1] = [lastRow[1], hr];
          }
        }
      }
    }
  }

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards36)']);

  // First card (hero style)
  if (firstCard) {
    // Image is inside a div with class utility-aspect-1x1
    const imgDiv = firstCard.querySelector('.utility-aspect-1x1');
    const img = imgDiv ? imgDiv.querySelector('img') : null;
    const textCell = buildTextCell(firstCard);
    rows.push([
      img ? img : '',
      textCell
    ]);
  }

  // Image cards
  imageCards.forEach(card => {
    // Image is inside a div with class utility-aspect-3x2
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    const img = imgDiv ? imgDiv.querySelector('img') : null;
    const textCell = buildTextCell(card);
    rows.push([
      img ? img : '',
      textCell
    ]);
  });

  // Add text-only card rows (with divider <hr> inside cell)
  textRows.forEach(row => rows.push(row));

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}

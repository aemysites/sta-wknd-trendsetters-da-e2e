/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (always one column)
  const headerRow = ['Hero (hero6)'];

  // Defensive: Get all direct children of the grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Row 2: Background image (optional)
  let bgImg = null;
  // Find the image element (background)
  for (const child of gridChildren) {
    const img = child.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const row2 = [bgImg ? bgImg : ''];

  // Row 3: Title, Subheading, CTA(s)
  let title = null;
  let subheading = null;
  let ctas = [];

  // Find the card with text content
  let card = null;
  for (const child of gridChildren) {
    const cardCandidate = child.querySelector('.card');
    if (cardCandidate) {
      card = cardCandidate;
      break;
    }
  }

  if (card) {
    // Title (h1)
    title = card.querySelector('h1');
    // Subheading (p)
    subheading = card.querySelector('p');
    // CTA(s) (buttons/links)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      ctas = Array.from(buttonGroup.querySelectorAll('a'));
    }
  }

  // Compose row 3 cell contents
  const row3Content = [];
  if (title) row3Content.push(title);
  if (subheading) row3Content.push(subheading);
  if (ctas.length > 0) row3Content.push(...ctas);
  const row3 = [row3Content.length > 0 ? row3Content : ''];

  // Build table rows
  const cells = [
    headerRow,
    row2,
    row3,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}

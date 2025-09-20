/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find image (background asset)
  const img = grid.querySelector('img');

  // Find the text container (the div sibling of the image)
  const gridChildren = Array.from(grid.children);
  const textContainer = gridChildren.find((child) => child !== img && child.nodeType === 1);
  if (!textContainer) return;

  // Compose header row with exact block name
  const headerRow = ['Hero (hero33)'];

  // Row 2: Image reference only (not URL)
  const imageRow = [img ? img : ''];

  // Row 3: All text content (headline, eyebrow, tag, author, etc)
  // Reference the whole text container for resilience and semantic preservation
  const textRow = [textContainer];

  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

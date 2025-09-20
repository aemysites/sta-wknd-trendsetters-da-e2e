/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the main content container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content div)
  const children = Array.from(grid.children);

  // Find the image element (first column)
  const img = children.find((el) => el.tagName === 'IMG');

  // Find the content container (second column)
  const contentDiv = children.find((el) => el !== img);

  // Defensive: If either is missing, abort
  if (!img || !contentDiv) return;

  // The header row for the block
  const headerRow = ['Columns block (columns3)'];

  // The second row: two columns, image and content
  const secondRow = [img, contentDiv];

  // Build the table cells array
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

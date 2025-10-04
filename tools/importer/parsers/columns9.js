/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // There are 3 main content areas visually:
  // 1. Left column: heading, subheading, paragraph
  // 2. Right column: contact list (ul)
  // 3. Bottom: image

  let leftCol = null;
  let rightCol = null;
  let image = null;

  // Find the left column (div with headings and paragraph)
  leftCol = gridChildren.find((child) => child.tagName === 'DIV');
  // Find the right column (ul with contact info)
  rightCol = gridChildren.find((child) => child.tagName === 'UL');
  // Find the image (img)
  image = gridChildren.find((child) => child.tagName === 'IMG');

  // Build table rows
  const headerRow = ['Columns block (columns9)'];

  // Second row: left and right columns
  const secondRow = [
    leftCol,
    rightCol,
  ];

  // Third row: image must be in both columns for correct column count, but avoid empty cell
  // Place image in first cell, and repeat image in second cell (since both columns visually show image)
  const thirdRow = [image, image.cloneNode(true)];

  // Compose table array
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

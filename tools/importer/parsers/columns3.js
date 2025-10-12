/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: must match the target block name exactly
  const headerRow = ['Columns block (columns3)'];

  // 2. Find the grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 3. Get the two columns (image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // 4. Left column: image (reference the existing <img> element)
  const leftCol = columns.find((col) => col.tagName === 'IMG');

  // 5. Right column: content (heading, subheading, buttons)
  const rightCol = columns.find((col) => col !== leftCol);

  if (!leftCol || !rightCol) return;

  // 6. Compose right column: preserve heading, subheading, and buttons
  const rightColContent = [];
  const heading = rightCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) rightColContent.push(heading);
  const subheading = rightCol.querySelector('p');
  if (subheading) rightColContent.push(subheading);
  const buttonGroup = rightCol.querySelector('.button-group');
  if (buttonGroup) rightColContent.push(buttonGroup);

  // 7. Build the table rows (first row: header, second row: columns)
  const rows = [
    headerRow,
    [leftCol, rightColContent]
  ];

  // 8. Create the table using DOMUtils (do not clone, use references)
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 9. Replace the original element with the block table
  element.replaceWith(table);
}

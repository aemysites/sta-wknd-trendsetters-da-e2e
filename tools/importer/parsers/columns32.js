/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid container (the columns block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 2. Get the two column children
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // 3. First column: text content (breadcrumbs, heading, meta, social)
  const leftCol = columns[0];
  // 4. Second column: image
  const rightCol = columns[1];

  // Defensive: if rightCol is not the image (sometimes grid order changes), check for image
  let imageCol = rightCol;
  let textCol = leftCol;
  if (!rightCol.querySelector('img')) {
    // If rightCol doesn't have an image, swap
    imageCol = leftCol;
    textCol = rightCol;
  }

  // 5. Build the table rows
  const headerRow = ['Columns block (columns32)'];
  const contentRow = [textCol, imageCol];

  // 6. Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // 7. Replace the original element
  element.replaceWith(table);
}

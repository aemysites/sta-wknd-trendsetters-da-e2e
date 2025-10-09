/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero37)'];

  // --- Step 1: Extract content elements ---
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  let heading = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // Find the left column (contains heading and subheading)
    const leftCol = grid.children[0];
    if (leftCol) {
      heading = leftCol.querySelector('h2');
      subheading = leftCol.querySelector('p');
    }
    // Find the right column (contains CTA)
    const rightCol = grid.children[1];
    if (rightCol && rightCol.tagName === 'A') {
      cta = rightCol;
    }
  }

  // --- Step 2: Prepare table rows ---
  // Row 2: Background image (none in this example)
  const imageRow = ['']; // No image, leave blank

  // Row 3: Content (heading, subheading, CTA)
  const contentCells = [];
  if (heading) contentCells.push(heading);
  if (subheading) contentCells.push(subheading);
  if (cta) contentCells.push(cta);

  // Defensive: If no content found, add a blank
  const contentRow = [contentCells.length ? contentCells : ''];

  // --- Step 3: Build table and replace ---
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

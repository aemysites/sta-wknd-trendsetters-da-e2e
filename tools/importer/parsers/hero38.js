/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row for Hero (hero38)
  const headerRow = ['Hero (hero38)'];

  // Defensive: find grid layout container (main content)
  const grid = element.querySelector('.grid-layout');
  let title = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // Find the left column (text)
    const leftCol = grid.children[0];
    if (leftCol) {
      title = leftCol.querySelector('h2');
      subheading = leftCol.querySelector('p');
    }
    // Find the right column (CTA)
    const rightCol = grid.children[1];
    if (rightCol && rightCol.tagName === 'A') {
      cta = rightCol;
    }
  }

  // Row 2: Background image (none in this example)
  const imageRow = ['']; // No image present

  // Row 3: Content (title, subheading, CTA)
  const contentCells = [];
  if (title) contentCells.push(title);
  if (subheading) contentCells.push(subheading);
  if (cta) contentCells.push(cta);

  // If nothing found, fallback to all text in grid
  if (contentCells.length === 0 && grid) {
    contentCells.push(grid);
  }

  const contentRow = [contentCells];

  // Assemble table rows
  const rows = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with block table
  element.replaceWith(block);
}

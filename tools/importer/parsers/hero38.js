/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero38) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (none in this case)
  // Row 3: Heading, subheading, CTA

  // --- Row 1 ---
  const headerRow = ['Hero (hero38)'];

  // --- Row 2 ---
  // No background image found in source HTML or screenshot
  const bgRow = [''];

  // --- Row 3 ---
  // Find heading, subheading, CTA
  let heading = null;
  let subheading = null;
  let cta = null;

  // Defensive: find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // The left column: heading and subheading
    const leftCol = grid.children[0];
    if (leftCol) {
      heading = leftCol.querySelector('h2');
      subheading = leftCol.querySelector('p');
    }
    // The right column: CTA button (anchor)
    const rightCol = grid.children[1];
    if (rightCol && rightCol.tagName === 'A') {
      cta = rightCol;
    }
  }

  // Compose content for row 3
  const contentRow = [
    [
      ...(heading ? [heading] : []),
      ...(subheading ? [subheading] : []),
      ...(cta ? [cta] : [])
    ]
  ];

  // Build table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero38) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional, none in this case)
  // Row 3: Heading, subheading, CTA

  // Header row
  const headerRow = ['Hero (hero38)'];

  // Row 2: No background image present, so leave empty
  const bgRow = [''];

  // Row 3: Extract content
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  let heading, subheading, cta;

  if (grid) {
    // Text column (usually first child)
    const textCol = grid.children[0];
    if (textCol) {
      heading = textCol.querySelector('h2');
      subheading = textCol.querySelector('p');
    }
    // CTA column (usually second child)
    const ctaCol = grid.children[1];
    if (ctaCol && ctaCol.tagName === 'A') {
      cta = ctaCol;
    }
  }

  // Compose content for row 3
  const content = [];
  if (heading) content.push(heading);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);

  const contentRow = [content];

  // Build the table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

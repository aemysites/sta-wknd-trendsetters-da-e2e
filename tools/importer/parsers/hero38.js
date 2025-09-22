/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero38) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional)
  // Row 3: Title, subheading, CTA (optional)

  // Helper: Get immediate children
  const topDivs = element.querySelectorAll(':scope > div');
  let backgroundImg = null;

  // Try to find a background image in the section or its children
  // (none in current HTML, but code is resilient)
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    backgroundImg = imgs[0];
  }

  // Find heading, subheading, and CTA
  let heading = null;
  let subheading = null;
  let cta = null;

  // Look for .container > .grid-layout > first grid cell for heading/subheading
  let gridCell = null;
  let gridLayout = null;
  for (const div of topDivs) {
    if (div.classList.contains('container')) {
      gridLayout = div.querySelector('.grid-layout');
      if (gridLayout) {
        const gridChildren = gridLayout.querySelectorAll(':scope > *');
        for (const child of gridChildren) {
          if (child.tagName === 'DIV') {
            gridCell = child;
            // Heading
            heading = gridCell.querySelector('h1, h2, h3, h4, h5, h6');
            // Subheading (look for p.subheading or first p)
            subheading = gridCell.querySelector('p.subheading, p');
          } else if (child.tagName === 'A') {
            cta = child;
          }
        }
      }
    }
  }

  // Compose cell for row 3: Title, subheading, CTA
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Table rows
  const headerRow = ['Hero (hero38)'];
  const imageRow = [backgroundImg ? backgroundImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}

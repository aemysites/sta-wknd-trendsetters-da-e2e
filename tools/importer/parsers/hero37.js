/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero37) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional, not present here)
  // Row 3: Heading, subheading, CTA

  // Helper: Get immediate children
  const topDiv = element.querySelector(':scope > div');
  let gridDiv = topDiv && topDiv.querySelector(':scope > div');
  if (!gridDiv) gridDiv = topDiv;

  // Find heading, subheading, CTA
  let heading = null;
  let subheading = null;
  let cta = null;

  // Defensive: Find all direct children of gridDiv
  const gridChildren = gridDiv ? Array.from(gridDiv.children) : [];
  for (const child of gridChildren) {
    // Heading and subheading are in a div
    if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
      heading = child.querySelector('h1, h2, h3, h4, h5, h6');
      subheading = child.querySelector('p, .subheading');
    }
    // CTA is likely an anchor styled as a button
    if (child.tagName === 'A' && child.classList.contains('button')) {
      cta = child;
    }
  }

  // Compose content cell
  const content = [];
  if (heading) content.push(heading);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);

  // Table rows
  const headerRow = ['Hero (hero37)'];
  const imageRow = ['']; // No image in this example
  const contentRow = [content];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

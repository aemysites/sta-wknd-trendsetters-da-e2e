/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of a given element
  function getDirectChildren(el, selector) {
    return Array.from(el.querySelectorAll(`:scope > ${selector}`));
  }

  // 1. Header row
  const headerRow = ['Hero (hero37)'];

  // 2. Background image row (none present in this source HTML)
  // The source HTML does not contain an image, so this cell will be empty
  const imageRow = [''];

  // 3. Content row: Title, Subheading, CTA
  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  let title, subheading, cta;

  if (grid) {
    // The first grid child contains heading and subheading
    const gridChildren = getDirectChildren(grid, 'div, a');
    const contentDiv = gridChildren.find((el) => el.tagName === 'DIV');
    if (contentDiv) {
      // Title (h2)
      title = contentDiv.querySelector('h2');
      // Subheading (p)
      subheading = contentDiv.querySelector('p');
    }
    // CTA (a.button)
    cta = gridChildren.find((el) => el.tagName === 'A');
  }

  // Compose content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Table rows
  const rows = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the block
  element.replaceWith(block);
}

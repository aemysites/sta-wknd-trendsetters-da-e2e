/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required by block spec
  const headerRow = ['Hero (hero37)'];

  // Defensive: Find the grid-layout (main content container)
  const grid = element.querySelector('.grid-layout');
  let title, subheading, cta;

  if (grid) {
    // The first child div contains the heading and subheading
    const contentDiv = grid.querySelector('div');
    if (contentDiv) {
      title = contentDiv.querySelector('h2');
      subheading = contentDiv.querySelector('p');
    }
    // The CTA is an <a> sibling in the grid
    cta = grid.querySelector('a');
  }

  // Second row: Background image (none in this HTML, so always empty)
  const bgImageRow = [''];

  // Third row: Title, subheading, CTA (in order, filter out nulls)
  const contentArr = [];
  if (title) contentArr.push(title);
  if (subheading) contentArr.push(subheading);
  if (cta) contentArr.push(cta);
  const contentRow = [contentArr];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

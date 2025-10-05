/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main content container (usually a grid)
  const grid = element.querySelector('.grid-layout');
  let heading, subheading, cta;
  if (grid) {
    // Find the left content (heading, subheading)
    const contentDiv = grid.querySelector('div');
    if (contentDiv) {
      heading = contentDiv.querySelector('h2');
      subheading = contentDiv.querySelector('p');
    }
    // Find the CTA button
    cta = grid.querySelector('a.button');
  }

  // Compose the content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Table rows
  const headerRow = ['Hero (hero38)'];
  // No background image in this HTML, so row 2 is empty
  const bgImageRow = [''];
  const contentRow = [contentCell];

  const cells = [headerRow, bgImageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

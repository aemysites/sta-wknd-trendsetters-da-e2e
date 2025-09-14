/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Hero (hero35)'];

  // There is no background image in the provided HTML, so 2nd row is empty
  const backgroundRow = [''];

  // 3rd row: collect heading, subheading, and CTA button
  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  let contentCell = [];
  if (grid) {
    // Get all direct children of the grid
    const gridChildren = grid.querySelectorAll(':scope > *');
    // The first child contains heading and subheading
    const firstCol = gridChildren[0];
    // The second child is the CTA button
    const secondCol = gridChildren[1];
    // Compose content cell
    contentCell = [];
    if (firstCol) {
      // Get heading and subheading (if present)
      const heading = firstCol.querySelector('h2, h1, h3, h4, h5, h6');
      const subheading = firstCol.querySelector('p');
      if (heading) contentCell.push(heading);
      if (subheading) contentCell.push(subheading);
    }
    if (secondCol) {
      contentCell.push(secondCol);
    }
  }

  const contentRow = [contentCell];

  // Build the table
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

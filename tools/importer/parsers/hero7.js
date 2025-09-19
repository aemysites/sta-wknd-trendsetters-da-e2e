/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block requirement
  const headerRow = ['Hero (hero7)'];

  // 2nd row: Background image (optional). This source HTML has no image, so leave empty.
  const bgImageRow = [''];

  // 3rd row: Title, subheading, CTA(s)
  // Find the grid container (should be only one)
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = '';
  if (grid) {
    // The first grid child contains heading and subheading
    const contentDiv = grid.children[0];
    // The second grid child contains the CTAs (buttons)
    const ctaDiv = grid.children[1];
    // Compose an array of content for the cell
    const cellContent = [];
    // Defensive: check for heading
    const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) cellContent.push(heading);
    // Defensive: check for subheading/paragraph
    const subheading = contentDiv.querySelector('p');
    if (subheading) cellContent.push(subheading);
    // Defensive: check for CTAs (links)
    if (ctaDiv) {
      // Collect all links in ctaDiv
      const links = Array.from(ctaDiv.querySelectorAll('a'));
      if (links.length > 0) {
        cellContent.push(...links);
      }
    }
    // If we found any content, use it, else leave blank
    contentCell = cellContent.length > 0 ? cellContent : '';
  }

  const contentRow = [contentCell];

  // Compose the table
  const rows = [headerRow, bgImageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}

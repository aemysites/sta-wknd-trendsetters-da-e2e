/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero37)'];

  // 2. Background image row (none in this HTML, so empty cell)
  const bgImageRow = [''];

  // 3. Content row: title, subheading, CTA
  // Find the grid-layout div (contains content)
  const grid = element.querySelector('.grid-layout');
  let contentCell = [];
  if (grid) {
    // Find the content div (contains heading and subheading)
    const contentDiv = grid.querySelector('div');
    if (contentDiv) {
      // Heading
      const heading = contentDiv.querySelector('h2');
      if (heading) contentCell.push(heading);
      // Subheading
      const subheading = contentDiv.querySelector('p');
      if (subheading) contentCell.push(subheading);
    }
    // Find the CTA button (a.button)
    const cta = grid.querySelector('a.button');
    if (cta) contentCell.push(cta);
  }

  // Defensive: if nothing found, fallback to all text
  if (contentCell.length === 0) {
    contentCell = [element.textContent];
  }

  // Compose table rows
  const cells = [
    headerRow,
    bgImageRow,
    [contentCell],
  ];

  // Create block table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

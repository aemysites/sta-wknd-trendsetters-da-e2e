/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero38)'];

  // 2. Background image row (always present, empty if not in HTML)
  const bgRow = [''];

  // 3. Content row: Title, Subheading, CTA
  const grid = element.querySelector('.grid-layout');
  let contentCell = '';
  if (grid) {
    const gridChildren = Array.from(grid.children);
    const textDiv = gridChildren.find(el => el.tagName === 'DIV');
    const ctaLink = gridChildren.find(el => el.tagName === 'A');
    const cellWrapper = document.createElement('div');
    if (textDiv) cellWrapper.appendChild(textDiv.cloneNode(true));
    if (ctaLink) cellWrapper.appendChild(ctaLink.cloneNode(true));
    contentCell = cellWrapper;
  }

  // Compose table rows: header, bg (always), content
  const rows = [
    headerRow,
    bgRow,
    [contentCell]
  ];

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout container (direct child of header)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) {
    // Defensive: fallback to empty table if structure is missing
    const headerRow = ['Hero (hero29)'];
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      [''],
      [''],
    ], document);
    element.replaceWith(table);
    return;
  }

  // The first grid child: background image
  const gridChildren = grid.children;
  let bgImg = '';
  if (gridChildren.length > 0) {
    const img = gridChildren[0].querySelector('img');
    if (img) {
      bgImg = img; // Reference the actual image element
    }
  }

  // The second grid child: text content
  let contentCell = '';
  if (gridChildren.length > 1) {
    // Find the h1 (title)
    const h1 = gridChildren[1].querySelector('h1');
    if (h1) {
      contentCell = h1; // Reference the actual h1 element
    }
  }

  // Compose the table
  const headerRow = ['Hero (hero29)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [bgImg],
    [contentCell],
  ], document);

  element.replaceWith(table);
}

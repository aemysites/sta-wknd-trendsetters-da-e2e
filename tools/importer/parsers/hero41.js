/* global WebImporter */
export default function parse(element, { document }) {
  // Get main grid children
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  const gridChildren = grid ? Array.from(grid.children) : [];

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero41)'];

  // --- ROW 2: Background Image ---
  // Find the background image element
  let bgImg = null;
  for (const child of gridChildren) {
    const img = child.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // --- ROW 3: Content (Title, Subheading, CTA) ---
  let contentCell = document.createElement('div');
  let contentDiv = null;
  if (gridChildren.length > 1) {
    contentDiv = gridChildren[1];
  }
  if (contentDiv) {
    // Find the inner grid
    const innerGrid = contentDiv.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Title (h1)
      const h1 = innerGrid.querySelector('h1');
      if (h1) contentCell.appendChild(h1);
      // Subheading and CTA
      const flexDiv = innerGrid.querySelector('.flex-vertical');
      if (flexDiv) {
        // Subheading (paragraph)
        const p = flexDiv.querySelector('p');
        if (p) contentCell.appendChild(p);
        // CTA (button group)
        const buttonGroup = flexDiv.querySelector('.button-group');
        if (buttonGroup) {
          const ctaLink = buttonGroup.querySelector('a');
          if (ctaLink) contentCell.appendChild(ctaLink);
        }
      }
    }
  }
  const contentRow = [contentCell];

  // --- BUILD TABLE ---
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}

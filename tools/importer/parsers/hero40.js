/* global WebImporter */
export default function parse(element, { document }) {
  // Locate main grid layout
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get grid children (background image cell, content cell)
  const gridChildren = mainGrid.querySelectorAll(':scope > div');

  // --- Background Image Extraction (row 2) ---
  let bgImg = null;
  if (gridChildren.length > 0) {
    bgImg = gridChildren[0].querySelector('img');
    // Reference the actual image element (do not clone)
  }

  // --- Content Extraction (row 3) ---
  let heading = null;
  let subheading = null;
  let cta = null;
  if (gridChildren.length > 1) {
    // Find nested grid for content
    const contentGrid = gridChildren[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      heading = contentGrid.querySelector('h1');
      // Subheading: first <p> inside contentGrid
      subheading = contentGrid.querySelector('p');
      // CTA: first <a> inside contentGrid
      cta = contentGrid.querySelector('a');
    }
  }

  // --- Table Construction ---
  // 1. Header row: block name exactly as required
  const headerRow = ['Hero (hero40)'];
  // 2. Image row: reference image element or empty string
  const imageRow = [bgImg ? bgImg : ''];
  // 3. Content row: preserve semantic order and reference elements
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Create the table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(block);
}

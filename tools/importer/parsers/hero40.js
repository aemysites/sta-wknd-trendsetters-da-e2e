/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // --- Extract background image ---
  let imgEl = null;
  const imgDiv = grid.querySelector('div > img.cover-image');
  if (imgDiv) {
    imgEl = imgDiv;
  }

  // --- Extract text content ---
  // The text content is in the second grid column
  let headingEl = null;
  let subheadingEl = null;
  let ctaEl = null;
  const textContainer = grid.querySelector('.container .w-layout-grid, .container .w-layout-grid.grid-layout, .container .w-layout-grid.tablet-1-column');
  // Fallback: try to find the text grid directly if above fails
  const contentGrid = textContainer || grid.querySelector('.w-layout-grid.tablet-1-column');
  if (contentGrid) {
    headingEl = contentGrid.querySelector('h1');
    subheadingEl = contentGrid.querySelector('p');
    ctaEl = contentGrid.querySelector('a');
  }

  // --- Compose content cell ---
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (subheadingEl) contentCell.push(subheadingEl);
  if (ctaEl) contentCell.push(ctaEl);

  // --- Build table rows ---
  const headerRow = ['Hero (hero40)'];
  const imageRow = [imgEl ? imgEl : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

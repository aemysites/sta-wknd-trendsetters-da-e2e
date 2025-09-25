/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid columns
  const gridDivs = element.querySelectorAll(':scope > div > div');

  // Defensive: Find the image (background)
  let bgImg = null;
  if (gridDivs.length > 0) {
    // Look for an img inside the first grid column
    const img = gridDivs[0].querySelector('img');
    if (img) bgImg = img;
  }

  // Defensive: Find the content (heading, paragraph, button)
  let contentCell = null;
  if (gridDivs.length > 1) {
    // The second grid column contains the text and button
    const innerGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      contentCell = innerGrid;
    } else {
      // Fallback: Use the second div directly
      contentCell = gridDivs[1];
    }
  }

  // Table rows
  const headerRow = ['Hero (hero41)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell ? contentCell : ''];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}

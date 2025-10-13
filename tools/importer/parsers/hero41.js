/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Header row ---
  const headerRow = ['Hero (hero41)'];

  // --- 2. Background image row ---
  // Find the background image (should reference the actual <img> element)
  let bgImg = null;
  const img = element.querySelector('img');
  if (img) {
    bgImg = img;
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // --- 3. Content row ---
  // Find the main heading, subheading, and CTA
  // The main content is in the second grid column
  let heading = null;
  let subheading = null;
  let cta = null;
  const contentDiv = element.querySelector('.container');
  if (contentDiv) {
    heading = contentDiv.querySelector('h1');
    subheading = contentDiv.querySelector('p');
    cta = contentDiv.querySelector('a');
  }
  // Compose content cell: preserve semantic order
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell.length ? contentCell : ''];

  // --- Build table ---
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

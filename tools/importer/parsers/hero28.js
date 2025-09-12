/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Hero (hero28)'];

  // ---
  // 1. Extract background image (optional)
  // Find the image inside the first grid cell
  let bgImgCell = null;
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid > div');
  if (gridDivs.length > 0) {
    // Look for an img inside the first grid cell
    const img = gridDivs[0].querySelector('img');
    if (img) {
      bgImgCell = [img];
    }
  }
  if (!bgImgCell) {
    // Fallback: no image found
    bgImgCell = [''];
  }

  // ---
  // 2. Extract headline and content (title, subheading, CTA)
  // The second grid cell contains the text content
  let contentCell = [];
  if (gridDivs.length > 1) {
    const contentDiv = gridDivs[1];
    // Find heading (h1)
    const heading = contentDiv.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Find subheading (h2/h3/h4/p) if present
    // For this HTML, there is no subheading, but code is resilient
    const subheading = contentDiv.querySelector('h2, h3, h4');
    if (subheading) contentCell.push(subheading);
    // Find paragraph (if present)
    const para = contentDiv.querySelector('p');
    if (para) contentCell.push(para);
    // Find CTA (a/button) if present
    const cta = contentDiv.querySelector('a, button');
    if (cta) contentCell.push(cta);
    // Defensive: If nothing found, fallback to empty string
    if (contentCell.length === 0) {
      contentCell = [''];
    }
  } else {
    contentCell = [''];
  }

  // ---
  // Compose table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}

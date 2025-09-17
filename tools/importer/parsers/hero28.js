/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Hero (hero28)'];

  // ---
  // 1. Find the background image (row 2)
  // ---
  // The image is inside a div with class 'ix-parallax-scale-out-hero', inside the first grid cell
  let imageCell = null;
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid > div');
  let bgImg = null;
  if (gridDivs.length > 0) {
    // Look for an img inside the first grid cell
    bgImg = gridDivs[0].querySelector('img');
    if (bgImg) {
      imageCell = bgImg;
    }
  }

  // ---
  // 2. Find the content area (row 3)
  // ---
  // The second grid cell contains the headline and possible CTA
  let contentCell = null;
  if (gridDivs.length > 1) {
    // The headline is inside an h1
    const container = gridDivs[1];
    // Defensive: Find the main content div
    const contentDiv = container.querySelector('.utility-margin-bottom-6rem') || container;
    // We'll include the whole contentDiv for resilience
    contentCell = contentDiv;
  }

  // Build the table rows
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}

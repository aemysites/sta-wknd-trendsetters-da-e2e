/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Hero (hero39)'];

  // --- Row 2: Background Image ---
  // Find the background image (img.cover-image)
  let bgImg = element.querySelector('img.cover-image');
  let bgImgRow;
  if (bgImg) {
    bgImgRow = [bgImg];
  } else {
    bgImgRow = ['']; // fallback empty cell if image not found
  }

  // --- Row 3: Content (title, subheading, CTA) ---
  // Find the container with the text and button
  // The structure is: header > div.grid-layout > div.container ...
  // We'll grab the container with the text content
  let contentContainer = element.querySelector('.container');
  let contentRow;
  if (contentContainer) {
    contentRow = [contentContainer];
  } else {
    contentRow = [''];
  }

  // Compose the table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

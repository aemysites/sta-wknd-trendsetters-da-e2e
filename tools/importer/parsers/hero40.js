/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero40)'];

  // 2. Background image row (2nd row)
  // Find the image inside the first grid-layout div
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: fallback to any img in the block if structure changes
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (3rd row)
  // Find the container with the text content
  let contentContainer = null;
  for (const div of gridDivs) {
    if (div.classList.contains('container')) {
      contentContainer = div;
      break;
    }
  }
  // Defensive: fallback to any container
  if (!contentContainer) {
    contentContainer = element.querySelector('.container');
  }
  // The content is inside a nested grid-layout
  let contentElements = [];
  if (contentContainer) {
    const innerGrid = contentContainer.querySelector('.grid-layout');
    if (innerGrid) {
      // Get all children of the inner grid
      contentElements = Array.from(innerGrid.children);
    } else {
      // Fallback: use all children of contentContainer
      contentElements = Array.from(contentContainer.children);
    }
  }
  // The first is the heading, the second is a div with paragraph and button
  const contentRow = [contentElements];

  // Assemble the table
  const tableCells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}

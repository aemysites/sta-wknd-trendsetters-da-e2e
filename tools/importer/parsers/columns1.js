/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all images from the columns block
  const images = Array.from(element.querySelectorAll('img'));
  // Each image goes in its own column (cell)
  const contentRow = images.map(img => {
    // Clone the image to avoid moving it from the DOM
    const clone = img.cloneNode(true);
    return clone;
  });

  const headerRow = ['Columns block (columns1)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}

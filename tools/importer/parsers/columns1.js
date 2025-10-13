/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct image elements (columns)
  const images = Array.from(element.querySelectorAll('img'));
  const headerRow = ['Columns block (columns1)'];
  // Each image becomes a column in the second row
  const contentRow = images.map(img => {
    // Clone the image and preserve alt/src attributes
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt || '';
    newImg.width = img.width || '';
    newImg.height = img.height || '';
    return newImg;
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}

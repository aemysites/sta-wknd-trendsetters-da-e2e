/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns1) - extract five images as columns
  const headerRow = ['Columns block (columns1)'];
  // Find all direct child divs with images
  const imageDivs = Array.from(element.children).filter(div => div.querySelector('img'));
  const cells = imageDivs.map(div => {
    const img = div.querySelector('img');
    if (!img) return '';
    // Clone image to preserve src and alt
    const clonedImg = document.createElement('img');
    clonedImg.src = img.src;
    clonedImg.alt = img.alt || '';
    clonedImg.className = img.className;
    return clonedImg;
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells,
  ], document);
  element.replaceWith(table);
}

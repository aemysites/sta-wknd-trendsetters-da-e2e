/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all images from the source HTML
  const images = element.querySelectorAll('img');
  // For each image, create an <img> element with its src and alt
  const contentRow = Array.from(images).map(img => {
    const newImg = document.createElement('img');
    newImg.src = img.src;
    if (img.alt) newImg.alt = img.alt;
    return newImg;
  });

  // Only proceed if we found images
  if (contentRow.length === 0) return;

  const headerRow = ['Columns (columns1)'];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as required
  const headerRow = ['Columns (columns1)'];

  // Find all image containers (each direct child div with an img)
  const imageDivs = Array.from(element.children).filter(div => {
    return div.querySelector('img');
  });

  // For each image container, extract the image element
  const columns = imageDivs.map(div => {
    const img = div.querySelector('img');
    // Clone the image to avoid moving it from the source DOM
    return img ? img.cloneNode(true) : document.createElement('span');
  });

  // If no images found, fallback to all text content
  const secondRow = columns.length > 0 ? columns : [document.createTextNode(element.textContent.trim())];

  const tableRows = [
    headerRow,
    secondRow
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

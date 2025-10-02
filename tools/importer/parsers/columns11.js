/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Columns (columns11)'];

  // Find the main container
  const container = element.querySelector(':scope > div.container');
  if (!container) {
    element.replaceWith(WebImporter.DOMUtils.createTable([headerRow], document));
    return;
  }

  // Find the two main grids
  const grids = container.querySelectorAll(':scope > div.w-layout-grid');
  if (grids.length < 2) {
    element.replaceWith(WebImporter.DOMUtils.createTable([headerRow], document));
    return;
  }
  const firstGrid = grids[0];
  const secondGrid = grids[1];

  // --- First content row (2 columns) ---
  // Left cell: all content from the first child of firstGrid (including all text and elements)
  let leftCol = '';
  const leftSource = firstGrid.children[0];
  if (leftSource) {
    // If it has any element or text, use its children, else fallback to textContent
    if (leftSource.childNodes.length > 0) {
      leftCol = Array.from(leftSource.childNodes).map(node => node.cloneNode(true));
    } else if (leftSource.textContent.trim()) {
      leftCol = leftSource.textContent.trim();
    }
  }

  // Right cell: all content from the second child of firstGrid (including all text and elements)
  let rightCol = '';
  const rightSource = firstGrid.children[1];
  if (rightSource) {
    if (rightSource.childNodes.length > 0) {
      rightCol = Array.from(rightSource.childNodes).map(node => node.cloneNode(true));
    } else if (rightSource.textContent.trim()) {
      rightCol = rightSource.textContent.trim();
    }
  }

  // --- Second content row (2 columns, images) ---
  // Each cell: all content from each child of secondGrid (including all text and elements)
  const imgDivs = Array.from(secondGrid.children);
  let imgCell1 = '';
  if (imgDivs[0]) {
    if (imgDivs[0].childNodes.length > 0) {
      imgCell1 = Array.from(imgDivs[0].childNodes).map(node => node.cloneNode(true));
    } else if (imgDivs[0].textContent.trim()) {
      imgCell1 = imgDivs[0].textContent.trim();
    }
  }
  let imgCell2 = '';
  if (imgDivs[1]) {
    if (imgDivs[1].childNodes.length > 0) {
      imgCell2 = Array.from(imgDivs[1].childNodes).map(node => node.cloneNode(true));
    } else if (imgDivs[1].textContent.trim()) {
      imgCell2 = imgDivs[1].textContent.trim();
    }
  }

  // Compose table rows
  const tableRows = [
    headerRow,
    [leftCol, rightCol],
    [imgCell1, imgCell2],
  ];

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

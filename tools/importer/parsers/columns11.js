/* global WebImporter */
export default function parse(element, { document }) {
  // Always create the header row
  const headerRow = ['Columns block (columns11)'];

  // Find the main container
  const container = element.querySelector('.container');
  if (!container) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Find the two main grids (first is text/meta, second is images)
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length < 2) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // First grid: left (headline), right (desc/meta/button)
  const firstGrid = grids[0];
  const firstGridCols = Array.from(firstGrid.children);
  const leftCol = firstGridCols[0];
  const rightCol = firstGridCols[1];

  // Second grid: two images
  const secondGrid = grids[1];
  const imageDivs = Array.from(secondGrid.children);
  const img1 = imageDivs[0]?.querySelector('img');
  const img2 = imageDivs[1]?.querySelector('img');

  // Extract all text content from leftCol and rightCol as elements (not just text)
  function extractContent(col) {
    if (!col) return '';
    // Get all text and inline structure
    const frag = document.createElement('div');
    Array.from(col.childNodes).forEach(node => {
      // Only append if it's not empty text
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') return;
      frag.appendChild(node.cloneNode(true));
    });
    // If no content, fallback to textContent
    if (frag.childNodes.length === 0) {
      const txt = col.textContent.trim();
      return txt ? txt : '';
    }
    return frag;
  }

  // Compose the second row: headline/meta + description (side by side)
  const secondRow = [extractContent(leftCol), extractContent(rightCol)];

  // Compose the third row: images side by side
  function extractImgCell(img) {
    if (!img) return '';
    const frag = document.createElement('div');
    frag.appendChild(img.cloneNode(true));
    return frag;
  }
  const thirdRow = [extractImgCell(img1), extractImgCell(img2)];

  // Build the table
  const tableRows = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

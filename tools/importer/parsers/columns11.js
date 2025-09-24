/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns block (columns11)'];

  // Find the main container
  const container = element.querySelector('.container');
  if (!container) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Top grid: left (headline) and right (desc, author, button)
  const topGrid = container.querySelector('.grid-layout.tablet-1-column');
  const bottomGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');

  if (!topGrid || !bottomGrid) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Get columns from top grid
  const topCols = Array.from(topGrid.children).filter(child => child.tagName === 'DIV');
  if (topCols.length < 2) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Left cell: preserve all text and inline elements
  let leftCell = '';
  const leftDiv = document.createElement('div');
  Array.from(topCols[0].childNodes).forEach(node => {
    leftDiv.appendChild(node.cloneNode(true));
  });
  leftCell = leftDiv;

  // Right cell: preserve all text and inline elements
  let rightCell = '';
  const rightDiv = document.createElement('div');
  Array.from(topCols[1].childNodes).forEach(node => {
    rightDiv.appendChild(node.cloneNode(true));
  });
  rightCell = rightDiv;

  // Images grid: two images (preserve all content in each cell)
  const imageDivs = Array.from(bottomGrid.children).filter(child => child.tagName === 'DIV');
  const images = imageDivs.map(div => {
    const cellDiv = document.createElement('div');
    Array.from(div.childNodes).forEach(node => {
      cellDiv.appendChild(node.cloneNode(true));
    });
    return cellDiv;
  });

  // Build table rows
  let tableRows = [headerRow];
  tableRows.push([leftCell, rightCell]);
  if (images.length === 2) {
    tableRows.push(images);
  }

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children divs of a container
  function getDirectDivs(parent) {
    return Array.from(parent.children).filter((el) => el.tagName === 'DIV');
  }

  // Find the main content containers
  const section = element;
  const containers = getDirectDivs(section);
  if (containers.length < 2) return;

  // --- FIRST ROW: headline/eyebrow (left), paragraph+author+button (right) ---
  const grid = containers[0];
  const gridDivs = getDirectDivs(grid);
  let leftCol = '', rightCol = '';
  if (gridDivs.length > 1) {
    // Left: include ALL content (not just eyebrow/h1)
    leftCol = document.createElement('div');
    Array.from(gridDivs[0].childNodes).forEach((node) => {
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        leftCol.appendChild(node.cloneNode(true));
      }
    });
    // Right: include ALL content (paragraph, author, button, etc)
    rightCol = document.createElement('div');
    Array.from(gridDivs[1].childNodes).forEach((node) => {
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        rightCol.appendChild(node.cloneNode(true));
      }
    });
  }

  // --- SECOND ROW: images ---
  const imageGrid = containers[1];
  const imageDivs = getDirectDivs(imageGrid);
  let imageCol1 = '', imageCol2 = '';
  if (imageDivs.length > 1) {
    imageCol1 = imageDivs[0].cloneNode(true);
    imageCol2 = imageDivs[1].cloneNode(true);
  }

  // Compose the table rows
  const headerRow = ['Columns (columns11)'];
  const firstContentRow = [leftCol, rightCol];
  const secondContentRow = [imageCol1, imageCol2];

  // Build the table
  const cells = [
    headerRow,
    firstContentRow,
    secondContentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}

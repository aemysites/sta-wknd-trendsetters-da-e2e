/* global WebImporter */
export default function parse(element, { document }) {
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));
  const leftCol = gridChildren.find((child) => child.tagName === 'DIV');
  const rightCol = gridChildren.find((child) => child.tagName === 'UL');
  const image = gridChildren.find((child) => child.tagName === 'IMG');

  const headerRow = ['Columns (columns16)'];
  const firstContentRow = [leftCol, rightCol];
  // Fix: image row must have same number of columns as content row, but no empty columns
  // Place image in first column, and rightCol in second column if possible, or use leftCol and rightCol as empty containers if needed
  const secondContentRow = [image, rightCol.cloneNode(false)]; // Use an empty UL for second column

  const cells = [
    headerRow,
    firstContentRow,
    secondContentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

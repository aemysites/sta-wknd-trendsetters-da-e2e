/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row
  const headerRow = ['Columns (columns39)'];

  // 2. Find the two main columns: left (text/buttons), right (images)
  // The structure is: header > div.container > div.grid-layout > [left, right]
  const gridLayout = element.querySelector('.grid-layout');
  if (!gridLayout) return;
  const columns = getImmediateChildren(gridLayout, 'div');
  if (columns.length < 2) return;

  // Left column: headline, subheading, button group
  const leftCol = columns[0];
  // Right column: grid of images
  const rightCol = columns[1];

  // Left column content
  const headline = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  const leftCellContent = [];
  if (headline) leftCellContent.push(headline);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Right column: get all images inside the nested grid
  const imageGrid = rightCol.querySelector('.grid-layout');
  let rightCellContent = [];
  if (imageGrid) {
    const images = getImmediateChildren(imageGrid, 'img');
    rightCellContent = images;
  }

  // 2nd row: two columns
  const secondRow = [leftCellContent, rightCellContent];

  // Compose table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}

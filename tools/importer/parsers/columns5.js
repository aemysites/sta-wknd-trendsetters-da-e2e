/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level grid that contains the two columns
  const grid = element.querySelector('.grid-layout.container');
  let leftCol = null;
  let rightImg = null;

  if (grid) {
    // Left column: look for the section with heading, paragraph, and buttons
    leftCol = grid.querySelector('.section');
    // Right column: look for the image sibling
    rightImg = grid.parentElement.querySelector('img');
  }

  // Defensive fallback if structure changes
  if (!leftCol) {
    leftCol = element.querySelector('.section');
  }
  if (!rightImg) {
    rightImg = element.querySelector('img');
  }

  // Compose left column content
  const leftCellContent = [];
  if (leftCol) {
    // Heading
    const heading = leftCol.querySelector('h2, h1, h3, h4, h5, h6');
    if (heading) leftCellContent.push(heading);
    // Paragraph or rich text
    const rich = leftCol.querySelector('.rich-text, .w-richtext, p');
    if (rich) leftCellContent.push(rich);
    // Button group
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftCellContent.push(buttonGroup);
  }

  // Compose right column content
  const rightCellContent = [];
  if (rightImg) {
    rightCellContent.push(rightImg);
  }

  // Build the Columns (columns5) table
  const headerRow = ['Columns (columns5)'];
  const columnsRow = [leftCellContent, rightCellContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}

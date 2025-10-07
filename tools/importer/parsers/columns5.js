/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding columns
  let grid = element.querySelector('.grid-layout.container');
  if (!grid) grid = element.querySelector('.w-layout-grid');
  if (!grid) grid = element.querySelector('div');

  // Find left column (content) and right column (image)
  let leftCol, rightCol;
  const children = Array.from(grid.children);
  if (children.length === 2) {
    leftCol = children[0];
    rightCol = children[1];
  } else {
    leftCol = grid.querySelector('div');
    rightCol = grid.querySelector('img');
  }

  // --- Left column: heading, paragraph, buttons ---
  const leftContent = [];
  if (leftCol) {
    const heading = leftCol.querySelector('h1, h2, .h1-heading, .h2-heading');
    if (heading) leftContent.push(heading);
    const paragraph = leftCol.querySelector('p, .rich-text, .w-richtext');
    if (paragraph) leftContent.push(paragraph);
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a, button'));
      leftContent.push(...buttons);
    }
  }

  // --- Right column: image ---
  const rightContent = [];
  // Always extract the image from the original HTML
  const img = element.querySelector('img');
  if (img) rightContent.push(img);

  // Table header: block name EXACTLY
  const headerRow = ['Columns block (columns5)'];
  // Table row: left column, right column
  const row = [leftContent, rightContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  // Replace element
  element.replaceWith(table);
}

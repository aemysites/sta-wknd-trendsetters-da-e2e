/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout container (the actual columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be columns)
  const columns = Array.from(grid.children);

  // Column 1: Heading (h2)
  const heading = columns.find(el => el.tagName === 'H2');

  // Column 2: Text and Button (div containing p and a)
  const rightCol = columns.find(el => el !== heading);
  let col2Content = [];
  if (rightCol) {
    // Get paragraph and button
    const paragraph = rightCol.querySelector('p');
    const button = rightCol.querySelector('a');
    if (paragraph) col2Content.push(paragraph);
    if (button) col2Content.push(button);
  }

  // Table header row (block name)
  const headerRow = ['Columns block (columns4)'];
  // Table content row: two columns, heading left, text+button right
  const contentRow = [heading, col2Content];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

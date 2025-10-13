/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns8) block: two columns, heading left, content right
  // Defensive: get immediate children of the grid-layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // First column: heading (h2)
  const heading = children.find((el) => el.tagName === 'H2');

  // Second column: paragraph and button
  const rightCol = children.find((el) => el.tagName === 'DIV');
  let rightContent = [];
  if (rightCol) {
    // Get paragraph and button inside rightCol
    const para = rightCol.querySelector('p');
    if (para) rightContent.push(para);
    const button = rightCol.querySelector('a');
    if (button) rightContent.push(button);
  }

  // Build table rows
  const headerRow = ['Columns (columns8)'];
  const columnsRow = [heading, rightContent];

  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

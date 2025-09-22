/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Identify grid children
  const gridChildren = Array.from(grid.children);
  let leftContent = null;
  let rightList = null;
  let image = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV' && child.querySelector('h3')) {
      leftContent = child;
    } else if (child.tagName === 'UL') {
      rightList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Build the table rows
  const headerRow = ['Columns block (columns9)'];
  const secondRow = [leftContent || '', rightList || ''];
  // Only add the image row if the image exists
  const cells = [headerRow, secondRow];
  if (image) {
    // Only add the image in the first column, do not add an empty column
    cells.push([image]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

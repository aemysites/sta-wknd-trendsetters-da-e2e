/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns5)'];

  // Find the two main columns: left (text/buttons), right (image)
  // The grid-layout container has two children: the content div and the image
  const grid = element.querySelector('.grid-layout.container');
  let leftCol = null;
  let rightCol = null;

  if (grid) {
    // The left column is the first child (a div), the right column is the image
    const children = Array.from(grid.children);
    leftCol = children.find((el) => el.tagName === 'DIV');
    rightCol = children.find((el) => el.tagName === 'IMG');
  }

  // Defensive fallback: if not found, try to get from direct children
  if (!leftCol || !rightCol) {
    const divs = Array.from(element.querySelectorAll(':scope div'));
    const imgs = Array.from(element.querySelectorAll('img'));
    leftCol = leftCol || divs[0];
    rightCol = rightCol || imgs[0];
  }

  // Compose the content row
  const contentRow = [
    leftCol || '',
    rightCol || ''
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

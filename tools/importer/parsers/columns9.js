/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify left column (text block)
  const leftCol = gridChildren.find((el) => el.querySelector('h2') && el.querySelector('h3'));
  // Identify right column (contact list)
  const rightCol = gridChildren.find((el) => el.tagName === 'UL');
  // Identify image (should be a direct child of grid)
  const img = gridChildren.find((el) => el.tagName === 'IMG');

  // Compose left column content: preserve heading levels and paragraph
  const leftColContent = [];
  if (leftCol) {
    const h2 = leftCol.querySelector('h2');
    const h3 = leftCol.querySelector('h3');
    const p = leftCol.querySelector('p');
    if (h2) leftColContent.push(h2);
    if (h3) leftColContent.push(h3);
    if (p) leftColContent.push(p);
  }

  // Compose right column content: wrap all contact list items in a <ul>
  let rightColContent = '';
  if (rightCol) {
    const ul = document.createElement('ul');
    Array.from(rightCol.children).forEach((li) => {
      ul.appendChild(li.cloneNode(true));
    });
    rightColContent = ul;
  }

  // Build the table rows
  const headerRow = ['Columns block (columns9)'];
  const columnsRow = [leftColContent, rightColContent];
  // The image should span both columns as a single cell in its own row
  const imageRow = [[img || '']];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
    imageRow,
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}

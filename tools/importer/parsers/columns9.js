/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be: left column, right column, image)
  const gridChildren = Array.from(grid.children);

  // Left column: intro text
  const leftCol = gridChildren.find(child => child.querySelector('h2, h3, p'));
  // Right column: contact methods (ul)
  const rightCol = gridChildren.find(child => child.tagName === 'UL');
  // Image (should be the last child)
  const img = grid.querySelector('img');

  // Compose left column cell
  const leftColContent = [];
  if (leftCol) {
    const h2 = leftCol.querySelector('h2');
    if (h2) leftColContent.push(h2);
    const h3 = leftCol.querySelector('h3');
    if (h3) leftColContent.push(h3);
    const p = leftCol.querySelector('p');
    if (p) leftColContent.push(p);
  }

  // Compose right column cell
  const rightColContent = [];
  if (rightCol) {
    const lis = Array.from(rightCol.querySelectorAll(':scope > li'));
    lis.forEach(li => {
      const icon = li.querySelector('.icon-container');
      const heading = li.querySelector('h4');
      let value = li.querySelector('a, div.utility-display-block, div:not(.icon-container):not([class*=icon])');
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      if (icon) row.appendChild(icon);
      if (heading) row.appendChild(heading);
      if (value) row.appendChild(value);
      rightColContent.push(row);
    });
  }

  // Compose image cell
  const imageCell = img ? [img] : [];

  // Build table rows
  const headerRow = ['Columns (columns9)'];
  const contentRow = [leftColContent, rightColContent];
  // Ensure all non-header rows have the same number of columns as the contentRow
  const cells = [
    headerRow,
    contentRow
  ];
  if (imageCell.length > 0) {
    // Add image row with two columns, second column is empty only if rightColContent exists
    cells.push([imageCell, rightColContent.length > 0 ? '' : null]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}

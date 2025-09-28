/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Assign columns based on visual layout
  let leftCol = [];
  let rightCol = [];
  let image = null;

  // Identify main content, contacts, and image
  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV') {
      // Main content: headings and paragraph
      const h2 = child.querySelector('h2');
      const h3 = child.querySelector('h3');
      const p = child.querySelector('p');
      if (h2) leftCol.push(h2);
      if (h3) leftCol.push(h3);
      if (p) leftCol.push(p);
    } else if (child.tagName === 'UL') {
      // Contacts list: each li is a contact method
      Array.from(child.children).forEach((li) => {
        rightCol.push(li);
      });
    } else if (child.tagName === 'IMG') {
      // Main image
      image = child;
    }
  });

  // Build table rows
  const headerRow = ['Columns (columns16)'];
  const contentRow = [leftCol, rightCol];
  // Fix: image row has same number of columns as contentRow, but only image in first column, omit second column if empty
  const imageRow = [image];

  // Compose table
  const rows = [
    headerRow,
    contentRow,
    imageRow,
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

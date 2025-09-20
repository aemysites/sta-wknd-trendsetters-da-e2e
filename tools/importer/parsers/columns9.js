/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify left (text) and right (contacts) columns
  let leftCol = null;
  let rightCol = null;
  let img = null;

  // Find the left column: div with headings and paragraph
  leftCol = gridChildren.find((child) => child.tagName === 'DIV');
  // Find the right column: ul with contacts
  rightCol = gridChildren.find((child) => child.tagName === 'UL');
  // Find the image: img (should be last child)
  img = gridChildren.find((child) => child.tagName === 'IMG');

  // Defensive fallback
  if (!leftCol && gridChildren.length > 0) leftCol = gridChildren[0];
  if (!rightCol && gridChildren.length > 1) rightCol = gridChildren[1];

  // Compose left column: all headings and paragraphs (preserve order)
  const leftContent = [];
  if (leftCol) {
    Array.from(leftCol.childNodes).forEach((node) => {
      if (["H2","H3","P"].includes(node.nodeName)) {
        leftContent.push(node);
      }
    });
  }

  // Compose right column: contact info list (ul)
  const rightContent = [];
  if (rightCol && rightCol.tagName === 'UL') {
    Array.from(rightCol.children).forEach((li) => {
      rightContent.push(li);
    });
  }

  // Compose image cell: reference the existing image element
  let imageCell = '';
  if (img) {
    imageCell = img;
  }

  // Build the table rows
  const headerRow = ['Columns block (columns9)'];
  const contentRow = [
    leftContent.length ? leftContent : '',
    rightContent.length ? rightContent : '',
  ];
  // All rows after the header must have the same number of columns as the second row
  const numCols = contentRow.length;
  const imageRow = [];
  if (imageCell) {
    imageRow.push(imageCell);
    // Pad with empty cells to match column count
    for (let i = 1; i < numCols; i++) imageRow.push('');
  }

  const cells = [
    headerRow,
    contentRow,
  ];
  if (imageRow.length) cells.push(imageRow);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

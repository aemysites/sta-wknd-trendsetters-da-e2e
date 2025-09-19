/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout for columns
  const mainContainer = element.querySelector('.container');
  let gridLayout;
  if (mainContainer) {
    gridLayout = mainContainer.querySelector('.grid-layout');
  }
  if (!gridLayout) {
    gridLayout = element.querySelector('.grid-layout');
  }

  let columns = [];
  if (gridLayout) {
    const gridChildren = Array.from(gridLayout.children);
    // Instead of filtering for specific elements, include all direct children as columns
    columns = gridChildren;
  } else if (mainContainer) {
    columns = Array.from(mainContainer.children);
  }
  columns = columns.filter(Boolean);

  // If columns are elements, extract their full content blocks (not just the node)
  const columnsRow = columns.map(col => {
    // If it's an image, keep as is
    if (col.tagName === 'IMG') return col;
    // Otherwise, create a fragment and append all children for full content
    const frag = document.createDocumentFragment();
    Array.from(col.childNodes).forEach(child => frag.appendChild(child.cloneNode(true)));
    return frag;
  });

  const headerRow = ['Columns (columns16)'];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}

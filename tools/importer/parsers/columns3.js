/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Defensive: Expecting two columns (image, content)
  let imgCol = null;
  let contentCol = null;
  if (children.length === 2) {
    // Identify which child is the image
    if (children[0].tagName === 'IMG') {
      imgCol = children[0];
      contentCol = children[1];
    } else if (children[1].tagName === 'IMG') {
      imgCol = children[1];
      contentCol = children[0];
    } else {
      // fallback: first is image, second is content
      imgCol = children[0];
      contentCol = children[1];
    }
  } else {
    // fallback: try to find image and content
    imgCol = grid.querySelector('img');
    contentCol = grid.querySelector('div');
  }

  // Table header
  const headerRow = ['Columns (columns3)'];

  // Table columns: image | content
  const columnsRow = [imgCol, contentCol];

  // Build table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}

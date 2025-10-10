/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Find the grid layout container (holds columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content)
  const columns = Array.from(grid.children);

  // Find the image (left column)
  const img = columns.find((el) => el.tagName === 'IMG');

  // Find the right column (text content)
  const rightCol = columns.find((el) => el !== img);

  // Compose the right column cell content
  const rightCellContent = document.createElement('div');
  if (rightCol) {
    // Eyebrow and tag (horizontal flex)
    const flexHorizontal = rightCol.querySelector('.flex-horizontal.x-left.y-center');
    if (flexHorizontal) {
      rightCellContent.appendChild(flexHorizontal);
    }
    // Headline
    const headline = rightCol.querySelector('h2');
    if (headline) {
      rightCellContent.appendChild(headline);
    }
    // Byline (horizontal flex with author, role, date)
    const byline = rightCol.querySelector('.flex-horizontal.flex-gap-xxs');
    if (byline) {
      rightCellContent.appendChild(byline);
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [img, rightCellContent]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

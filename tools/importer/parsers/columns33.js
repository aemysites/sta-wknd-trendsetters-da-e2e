/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the grid children (should be image and content)
  const gridChildren = Array.from(grid.children);

  // Find the image element
  const imgEl = gridChildren.find((el) => el.tagName === 'IMG');
  // Find the content column (the div with text)
  const contentEl = gridChildren.find((el) => el !== imgEl);

  // Defensive: if either column is missing, abort
  if (!imgEl || !contentEl) return;

  // Use the required block header
  const headerRow = ['Columns block (columns33)'];

  // Each column cell should reference the actual element (not clone)
  const columnsRow = [imgEl, contentEl];

  // Build the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

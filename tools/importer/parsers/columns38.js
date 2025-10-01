/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns38)'];

  // Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all direct children of the grid (each is a column)
    const gridChildren = Array.from(grid.children);

    // For this HTML, there are two columns:
    // - First column: heading + subheading
    // - Second column: button
    if (gridChildren.length >= 2) {
      // First column content: heading + subheading
      const firstCol = gridChildren[0];
      // Defensive: get all children (could be h2, p, etc)
      const firstColContent = Array.from(firstCol.children);
      columns.push(firstColContent);

      // Second column: button (could be an <a> or <button>)
      const secondCol = gridChildren[1];
      columns.push([secondCol]);
    } else {
      // Fallback: treat all children as columns
      columns = gridChildren.map((col) => [col]);
    }
  } else {
    // Fallback: treat the whole element as one column
    columns = [[element]];
  }

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

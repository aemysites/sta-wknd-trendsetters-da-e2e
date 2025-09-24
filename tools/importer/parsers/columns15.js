/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Defensive: Find the grid-layout container (should be only one)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));

  // For this block, each column is a cell in the second row
  // Each column may contain multiple elements (e.g., <p>, <a>), so we collect all children
  const cells = columns.map((col) => {
    // If column has only one child, use that element directly
    const children = Array.from(col.childNodes).filter((node) => {
      // Only include element nodes and non-empty text nodes
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
    });
    // If only one child, use it directly, else use array
    if (children.length === 1) {
      return children[0];
    }
    return children;
  });

  // Build the table rows
  const tableRows = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

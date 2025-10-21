/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the footer
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Ensure all text content from the HTML is included in any cell
  // Specifically, preserve <br> tags in screen-reader labels for strict fidelity
  columns.forEach(col => {
    col.querySelectorAll('.utility-screen-reader-visible-only').forEach(label => {
      // Replace <br> tags with actual <br> elements for fidelity
      label.innerHTML = label.innerHTML.replace(/<br\s*\/?>(\s*)?/gi, '<br>');
    });
  });

  // Prepare the header row for the block table
  const headerRow = ['Columns (columns21)'];

  // Prepare the second row: one cell per column
  // Each cell contains the entire content of that column (referenced, not cloned)
  const contentRow = columns.map((col) => col);

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

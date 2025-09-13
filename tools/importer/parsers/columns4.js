/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element has at least one child
  if (!element || !element.children || element.children.length === 0) return;

  // Get all immediate children (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, grab its content (likely a single image per cell)
  const contentRow = columns.map(col => {
    // If the column has children, use them; otherwise, use the column itself
    // In this HTML, each column is a div with a single img
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Fallback: use the column div itself
    return col;
  });

  // Build the table rows
  const headerRow = ['Columns (columns4)'];
  const tableRows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

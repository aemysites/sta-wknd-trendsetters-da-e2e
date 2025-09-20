/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the specified block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Get all immediate children of the grid (each is a column cell)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell should contain its entire content (usually an image in this case)
  const contentRow = columns.map(col => {
    // Defensive: If the column has only one child (e.g., the image wrapper), use that
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    return col;
  });

  // Compose the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only keep columns that have meaningful content (text or images)
  const meaningfulColumns = columns.filter(col => col.textContent.trim() || col.querySelector('img'));

  // Build the header row exactly as required
  const headerRow = ['Columns (columns21)'];

  // Each cell in the second row is the actual column DOM node (preserving all semantics and references)
  const contentRow = meaningfulColumns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

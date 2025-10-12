/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Prepare the header row as required
  const headerRow = ['Columns block (columns21)'];

  // Helper to clean up column content: remove unnecessary attributes and <br> tags
  function cleanColumnContent(col) {
    // Clone to avoid modifying original
    const clone = col.cloneNode(true);
    // Remove all data-hlx-imp-color and class attributes
    clone.querySelectorAll('[data-hlx-imp-color]').forEach(el => el.removeAttribute('data-hlx-imp-color'));
    clone.querySelectorAll('[class]').forEach(el => el.removeAttribute('class'));
    // Remove <br> tags
    clone.querySelectorAll('br').forEach(br => br.remove());
    return clone;
  }

  // Prepare the columns row: each cell is the cleaned content of one column
  const columnsRow = columns.map(col => cleanColumnContent(col));

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

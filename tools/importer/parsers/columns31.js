/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (the direct child of .container)
  let grid = null;
  if (element.classList.contains('grid-layout')) {
    grid = element;
  } else {
    grid = element.querySelector('.grid-layout');
  }
  if (!grid) return;

  // Get all immediate child divs (columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Build the table rows
  const headerRow = ['Columns (columns31)'];
  const contentRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns15) block: 3 columns, each with a distinct piece of content
  // Defensive: Find the grid container (should be a direct child of the element)
  const grid = element.querySelector(':scope > .grid-layout');
  let columns = [];
  if (grid) {
    // Get all direct children of the grid (each is a column)
    const colEls = Array.from(grid.children);
    // Defensive: Only take up to 3 columns as per screenshot and HTML
    columns = colEls.slice(0, 3).map((col) => {
      // If column contains a single child, use that child directly
      if (col.children.length === 1) {
        return col.children[0];
      }
      // Otherwise, use the whole column element
      return col;
    });
  } else {
    // Fallback: try to get all direct div children of element
    columns = Array.from(element.querySelectorAll(':scope > div'));
  }

  // Table header row (block name)
  const headerRow = ['Columns (columns15)'];
  // Table content row: each column's content as a cell
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}

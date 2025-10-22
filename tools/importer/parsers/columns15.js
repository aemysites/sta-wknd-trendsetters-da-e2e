/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Defensive: Find the grid container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  // If not found, fallback to all direct children
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);

  // For this block, each column is a cell in the second row
  // We'll reference the entire column element for resilience
  const cellsRow = columns.map((col) => {
    // If the column is a wrapper div with a single child, unwrap it
    // But only if it's a simple wrapper (e.g., <div><p>...</p></div>)
    if (
      col.childElementCount === 1 &&
      (col.firstElementChild.tagName === 'P' || col.firstElementChild.tagName === 'A')
    ) {
      return col.firstElementChild;
    }
    return col;
  });

  // Compose the table rows
  const rows = [headerRow, cellsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

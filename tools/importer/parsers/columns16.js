/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns16)'];

  // Defensive: Find the grid container (should be the first .grid-layout descendant)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate child divs of the grid (each is a column)
  const columnDivs = Array.from(grid.children);

  // For each column, extract the image element inside
  const columns = columnDivs.map(colDiv => {
    // Defensive: Find the img element inside
    const img = colDiv.querySelector('img');
    // If found, use the image element; else, use an empty string
    return img ? img : '';
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

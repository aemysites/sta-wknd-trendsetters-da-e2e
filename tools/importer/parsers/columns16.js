/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Columns block (columns16)'];

  // Defensive: Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child divs of the grid (each is a column)
  const columnDivs = Array.from(grid.children);

  // For each column, find the image (or main content)
  const columns = columnDivs.map((colDiv) => {
    // Find the first img inside this column
    const img = colDiv.querySelector('img');
    if (img) {
      return img;
    }
    // If no image, just use the column div itself
    return colDiv;
  });

  // Create the table rows
  const cells = [
    headerRow,
    columns,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required by block spec
  const headerRow = ['Table (no header, tableNoHeader18)'];

  // Get all immediate children that represent each Q&A block
  // Defensive: Only consider direct children that contain the grid layout
  const rows = [];
  const dividers = element.querySelectorAll(':scope > div.divider');
  dividers.forEach(divider => {
    // Each divider contains a grid-layout div with two children: heading and paragraph
    const grid = divider.querySelector('.w-layout-grid.grid-layout');
    if (grid) {
      const cells = [];
      // Find all direct children of the grid (should be 2: heading and paragraph)
      const gridChildren = grid.querySelectorAll(':scope > div');
      if (gridChildren.length >= 2) {
        // First cell: heading
        cells.push(gridChildren[0]);
        // Second cell: paragraph
        cells.push(gridChildren[1]);
      } else {
        // Fallback: if not enough children, just push whatever is there
        gridChildren.forEach(child => cells.push(child));
      }
      rows.push(cells);
    }
  });

  // Compose the table data: header row, then each Q&A row
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}

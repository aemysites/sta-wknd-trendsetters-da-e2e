/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns1) parsing
  // Header row: always block name
  const headerRow = ['Columns block (columns1)'];

  // Defensive: get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect its content
  // In this example, each column is a div containing an image
  const columnCells = columns.map((col) => {
    // If the column contains only an image, use the image element
    const img = col.querySelector('img');
    if (img) return img;
    // If not, use the whole column element (for future-proofing)
    return col;
  });

  // Build the table: header row, then one row with all columns side by side
  const cells = [
    headerRow,
    columnCells,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

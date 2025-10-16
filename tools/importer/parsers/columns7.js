/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header row
  const headerRow = ['Columns block (columns7)'];

  // Get all immediate child divs (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column div, find the image inside and use the image element directly
  const cells = columnDivs.map(col => {
    // Defensive: get the first img inside this column div
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Compose the table structure: header row, then one row with N columns
  const tableRows = [
    headerRow,
    cells
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

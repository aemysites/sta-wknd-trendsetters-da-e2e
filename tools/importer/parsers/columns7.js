/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column div contains an image (reference the existing <img> element)
  const images = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : '';
  });

  // Table header row: must match the target block name exactly
  const headerRow = ['Columns block (columns7)'];
  const columnsRow = images;

  // Compose table data
  const tableData = [
    headerRow,
    columnsRow
  ];

  // Create the columns block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns39) block header row
  const headerRow = ['Columns (columns39)'];

  // Extract each column's main content
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image element (reference, not clone)
  const columns = columnDivs.map(col => {
    const img = col.querySelector('img');
    // If image found, reference the existing element
    return img ? img : '';
  });

  // Build the table rows: header + one row with all columns
  const rows = [
    headerRow,
    columns
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

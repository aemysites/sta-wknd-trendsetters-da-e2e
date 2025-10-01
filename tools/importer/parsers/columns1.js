/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns1)'];

  // Get all immediate child divs (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column div, extract its content (should be just an image per cell)
  const columns = columnDivs.map(div => {
    // Defensive: find the first image inside the div
    const img = div.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows: header row, then one row with all images as columns
  const rows = [
    headerRow,
    columns,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

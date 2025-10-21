/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns (columns39) block
  const headerRow = ['Columns (columns39)'];

  // Get all direct child divs (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the main image (if present)
  const columns = columnDivs.map(div => {
    // Find the first image inside the column div
    const img = div.querySelector('img');
    // If image found, reference the image element; else, reference the div
    return img || div;
  });

  // Build the table rows
  const rows = [
    headerRow,
    columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

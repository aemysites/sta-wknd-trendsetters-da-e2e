/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns30) parsing for two side-by-side images
  // Header row
  const headerRow = ['Columns block (columns30)'];

  // Get immediate children (should be two divs, each with an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least two columns
  if (columnDivs.length < 2) return;

  // For each column, extract the image element (if present)
  const columns = columnDivs.map(colDiv => {
    // Find the first image inside this column
    const img = colDiv.querySelector('img');
    return img ? img : colDiv; // fallback: use the whole column div if no image found
  });

  // Build the table rows: header + one row with both images (columns)
  const rows = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

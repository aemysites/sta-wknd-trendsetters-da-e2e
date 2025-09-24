/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column div, extract its image (if present)
  const columnCells = columns.map((colDiv) => {
    // Find the first image inside this column div
    const img = colDiv.querySelector('img');
    // Only include the image if it exists
    return img ? img : document.createTextNode('');
  });

  // Table structure: header row, then one row with images side by side
  const headerRow = ['Columns (columns30)'];
  const tableRows = [headerRow, columnCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

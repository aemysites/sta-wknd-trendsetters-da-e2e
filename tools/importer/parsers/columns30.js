/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns30) header row
  const headerRow = ['Columns block (columns30)'];

  // Get all immediate child divs (each column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its content (image element only)
  const columns = columnDivs.map(div => {
    const img = div.querySelector('img');
    // Reference the existing image element, not clone or create new
    return img ? img : document.createTextNode(''); // If no image, leave cell empty
  });

  // Build the table rows: header, then columns
  const rows = [
    headerRow,
    columns
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

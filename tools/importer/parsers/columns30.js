/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name in the header row
  const headerRow = ['Columns block (columns30)'];

  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (image)
  const cells = columns.map((col) => {
    // Find the image inside this column
    const img = col.querySelector('img');
    // Defensive: Only include if image exists
    return img ? img : document.createTextNode('');
  });

  // Build the table rows
  const tableRows = [
    headerRow,
    cells,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

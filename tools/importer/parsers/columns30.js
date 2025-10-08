/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns30)'];

  // Get all direct children (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Extract the image element from each column, referencing the existing <img> element
  const images = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the existing image element, not a new one
    return img || document.createTextNode('');
  });

  // Build the table rows: header and image row
  const tableRows = [
    headerRow,
    images
  ];

  // Create the block table using the utility
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns30)'];

  // Get all direct children (should be two divs, each with an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column div, find the image inside and reference the existing element
  const images = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : document.createTextNode('');
  });

  // Build the table rows
  const rows = [
    headerRow,
    images // Second row: one cell per image
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

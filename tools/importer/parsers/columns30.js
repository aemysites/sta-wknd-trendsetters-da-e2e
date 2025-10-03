/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate children (should be two .utility-aspect-1x1 divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column div contains one image
  const images = columnDivs.map(div => {
    // Find the first image inside this div
    const img = div.querySelector('img');
    return img ? img : null;
  }).filter(Boolean); // Remove nulls in case of missing images

  // Table header row
  const headerRow = ['Columns block (columns30)'];

  // Second row: one column per image
  const columnsRow = images;

  // Build the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

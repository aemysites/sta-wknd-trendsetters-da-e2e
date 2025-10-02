/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header
  const headerRow = ['Columns block (columns1)'];

  // Get all direct children (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each child div contains an image (no text, no links)
  // Each image is visually a column
  const columnsRow = columnDivs.map(div => {
    // Defensive: find the first image in the div
    const img = div.querySelector('img');
    return img || div; // fallback to div if no img (shouldn't happen)
  });

  // Compose the table
  const tableCells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(block);
}

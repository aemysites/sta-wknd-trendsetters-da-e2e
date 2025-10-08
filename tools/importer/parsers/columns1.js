/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header
  const headerRow = ['Columns block (columns1)'];

  // Defensive: Get all direct child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column's content: for this block, each div contains a single image
  const columns = columnDivs.map(div => {
    // Defensive: Find the first image in each column div
    const img = div.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const rows = [
    headerRow,
    columns
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

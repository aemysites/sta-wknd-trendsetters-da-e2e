/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns7)'];

  // Defensive: Get all direct children that represent columns (each with an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image element (if present)
  const images = columnDivs.map(div => {
    // Defensive: Find the first image in each column div
    const img = div.querySelector('img');
    return img || document.createTextNode(''); // fallback to empty if no image
  });

  // Build the table rows
  const rows = [headerRow, images];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

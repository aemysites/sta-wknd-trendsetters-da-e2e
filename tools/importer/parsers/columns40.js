/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block spec
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate child divs (each column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: only include divs with image children
  const cells = columnDivs.map(div => {
    // Find the first image in each div
    const img = div.querySelector('img');
    if (img) {
      return img;
    }
    // If no image, fallback to the div itself
    return div;
  });

  // Build table rows: first is header, second is columns
  const tableRows = [headerRow, cells];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

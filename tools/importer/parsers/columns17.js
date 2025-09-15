/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per block requirements
  const headerRow = ['Columns block (columns17)'];

  // Get all direct children (should be 6 divs, each with an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: ensure we have at least one column
  if (!columnDivs.length) return;

  // For each column, extract the image (direct child of div)
  const columns = columnDivs.map(div => {
    // Find the first img inside the div
    const img = div.querySelector('img');
    // Defensive: only include if image exists
    return img ? img : '';
  });

  // Only one row of images, so single content row
  const contentRow = columns;

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

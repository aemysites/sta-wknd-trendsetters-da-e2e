/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Get all immediate children (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only include divs with at least one child (should always be true for this block)
  const columns = columnDivs.map(div => {
    // Each div contains a single image
    const img = div.querySelector('img');
    // Defensive: Only include if image exists
    return img ? img : '';
  });

  // Compose the table rows
  const rows = [headerRow, columns];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

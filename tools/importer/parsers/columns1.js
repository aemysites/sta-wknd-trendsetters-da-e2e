/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Defensive: get all direct children (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its content (usually a single image per div in this block)
  const columns = columnDivs.map(div => {
    // If the div contains an image, use the image element directly
    const img = div.querySelector('img');
    if (img) return img;
    // If not, just use the div's content (fallback)
    return div;
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns30)'];

  // Get all direct children (should be the two .utility-aspect-1x1 divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell should reference the original image element (not clone or create new)
  const contentRow = columns.map(col => {
    // Find the image inside this column
    const img = col.querySelector('img');
    // Defensive: if there is an image, reference it directly
    return img ? img : '';
  });

  // Build the table rows array
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

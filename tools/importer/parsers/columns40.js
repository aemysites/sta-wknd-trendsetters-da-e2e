/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate children (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: If no columns found, do nothing
  if (!columns.length) return;

  // For each column, find its main image (if any)
  const contentRow = columns.map((col) => {
    // Try to find an image inside the column
    const img = col.querySelector('img');
    // If found, use the image element itself
    if (img) return img;
    // Otherwise, use the whole column (fallback)
    return col;
  });

  // Compose the table rows
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

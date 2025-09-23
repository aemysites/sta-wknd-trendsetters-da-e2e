/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Defensive: get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, grab its content (usually an image)
  // If the column contains only one child (e.g., an image), use that child directly
  // Otherwise, use the whole column div
  const contentRow = columns.map((col) => {
    // If the column contains only one child and it's an image, use the image
    if (col.children.length === 1 && col.firstElementChild.tagName === 'IMG') {
      return col.firstElementChild;
    }
    // Otherwise, use the whole column div
    return col;
  });

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}

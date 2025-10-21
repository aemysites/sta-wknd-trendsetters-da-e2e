/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns1)'];

  // Defensive: Find all immediate children of the block
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each child is a column cell (each contains an image)
  const columns = children.map((col) => {
    // Find the image inside this column
    const img = col.querySelector('img');
    // Defensive: Only include the image if it exists
    return img ? img : '';
  });

  // Build the table rows
  const rows = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}

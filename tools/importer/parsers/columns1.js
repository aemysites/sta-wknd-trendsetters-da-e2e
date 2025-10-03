/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header
  const headerRow = ['Columns block (columns1)'];

  // Get all immediate children of the grid container
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have children
  if (!children.length) return;

  // For this block, each child is a column cell (each contains an image)
  // We'll extract the first image from each child div
  const imageCells = children.map((child) => {
    // Find the first image inside this child
    const img = child.querySelector('img');
    // Only add if image exists
    return img || '';
  });

  // Compose the table rows
  const rows = [
    headerRow,
    imageCells
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

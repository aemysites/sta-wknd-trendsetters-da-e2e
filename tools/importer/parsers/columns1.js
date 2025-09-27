/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Columns (columns1)'];

  // Get all immediate children of the grid container
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are children
  if (!children.length) return;

  // For this block, each child is a column, each containing an image
  const images = children.map((col) => {
    // Find the first image inside this column
    const img = col.querySelector('img');
    // Defensive: Only include if image exists
    return img || '';
  });

  // The columns block expects a single row with N columns (one per image)
  const columnsRow = images;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

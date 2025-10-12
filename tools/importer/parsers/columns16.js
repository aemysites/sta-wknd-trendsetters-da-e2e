/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name for the header row
  const headerRow = ['Columns block (columns16)'];

  // Defensive: Find the grid container (holds all columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate grid children (each is a column)
  const columns = Array.from(grid.children);

  // For this block, each column contains a single image
  // We'll extract the image from each column
  const images = columns.map(col => {
    // Defensive: Find the image inside the column
    const img = col.querySelector('img');
    return img ? img : document.createTextNode('');
  });

  // Build the table rows
  // Second row: one cell per image (6 columns)
  const contentRow = images;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

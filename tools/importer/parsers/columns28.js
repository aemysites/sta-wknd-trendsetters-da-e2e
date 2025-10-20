/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout (the two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: left (text), right (image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column (text and cta)
  const leftCol = columns[0];
  // Right column (image)
  const rightCol = columns[1];

  // --- Build the table ---
  const headerRow = ['Columns (columns28)'];

  // Second row: left column (all text/cta), right column (image)
  // Use the entire leftCol and rightCol elements for resilience
  const contentRow = [leftCol, rightCol];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

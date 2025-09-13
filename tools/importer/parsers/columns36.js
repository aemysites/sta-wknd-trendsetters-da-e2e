/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;

  // The grid with two columns (text, images)
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main children (left: text, right: images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = columns[0];
  // Right column: grid of images
  const rightCol = columns[1];

  // --- Left cell content ---
  // We'll include the whole leftCol block (heading, subheading, buttons)
  // --- Right cell content ---
  // The rightCol contains a grid of images; we'll include the grid div directly
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  // Fallback: if not found, use rightCol itself
  const rightCellContent = imageGrid || rightCol;

  // Build the table rows
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftCol, rightCellContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

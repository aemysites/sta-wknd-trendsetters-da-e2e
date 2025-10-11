/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Find the grid layout container (the direct child of the block)
  const grid = element.querySelector(':scope > .grid-layout');
  // If not found, fallback to first child
  const gridContainer = grid || element.firstElementChild;

  // Get all immediate children of the grid layout (these are the columns)
  const columns = Array.from(gridContainer ? gridContainer.children : []);

  // Defensive: If no columns found, fallback to all children of element
  const cells = columns.length > 0 ? columns : Array.from(element.children);

  // Each cell should reference the actual column element (text, button, etc)
  const contentRow = cells.map((col) => col);

  // Build the table rows
  const tableRows = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

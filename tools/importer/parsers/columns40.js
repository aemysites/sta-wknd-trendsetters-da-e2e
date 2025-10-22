/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have columns
  if (!columns.length) return;

  // For each column, extract its main content (image, etc.)
  const columnCells = columns.map(col => {
    // Try to find an image inside the column
    const img = col.querySelector('img');
    if (img) {
      // Reference the existing image element (do not clone)
      return img;
    }
    // If no image, include all text content from the column
    const text = col.textContent.trim();
    if (text) {
      const td = document.createElement('div');
      td.textContent = text;
      return td;
    }
    // If column is empty, return an empty cell
    return document.createElement('div');
  });

  // Build the table rows
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}

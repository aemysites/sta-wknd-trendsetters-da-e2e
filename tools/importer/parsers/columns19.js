/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns19)'];

  // Get all immediate children (each column cell)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: if no children, do nothing
  if (!children.length) return;

  // We'll build rows as arrays of cells
  // The first content row is the first 4 columns (as seen in screenshot)
  // The second content row is the next 4 columns
  const columnsPerRow = 4;
  const rows = [];

  for (let i = 0; i < children.length; i += columnsPerRow) {
    // For each group of 4, build a row
    const row = [];
    for (let j = 0; j < columnsPerRow; j++) {
      const child = children[i + j];
      if (child) {
        // Each child is a column cell, but we want only its content (icon + p)
        // We'll collect the icon and the text paragraph
        const icon = child.querySelector('.icon');
        const p = child.querySelector('p');
        const cellContent = [];
        if (icon) cellContent.push(icon);
        if (p) cellContent.push(p);
        row.push(cellContent);
      } else {
        // If fewer than 4 in the last row, fill with empty string
        row.push('');
      }
    }
    rows.push(row);
  }

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}

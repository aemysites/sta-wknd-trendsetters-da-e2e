/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Find the grid layout container (assume first child is the grid)
  const grid = element.querySelector(':scope > .grid-layout');
  // If not found, fallback to all direct children
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);

  // Prepare the columns for the second row
  // Screenshot shows: 3 columns: text, text, button
  const cells = [headerRow];

  // Defensive: Extract content for each column
  const row = [];
  // Column 1: Text block (first child)
  if (columns[0]) {
    // Use the first <p> inside
    const p1 = columns[0].querySelector('p') || columns[0];
    row.push(p1);
  } else {
    row.push('');
  }
  // Column 2: Text block (second child)
  if (columns[1]) {
    const p2 = columns[1].querySelector('p') || columns[1];
    row.push(p2);
  } else {
    row.push('');
  }
  // Column 3: Button (third child)
  if (columns[2]) {
    // Use the <a> button inside
    const btn = columns[2].querySelector('a,button') || columns[2];
    row.push(btn);
  } else {
    row.push('');
  }

  cells.push(row);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}

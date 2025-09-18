/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // 1. Header row: always use the block name as specified
  const headerRow = ['Columns (columns4)'];

  // 2. Content row: each immediate child div contains an image (column)
  //    We'll collect each child div (with its image) as a cell
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: only proceed if we have at least one column
  if (columnDivs.length === 0) return;

  // For each column, we want the content (the image inside the div)
  // We'll reference the div directly to preserve any structure/classes
  const contentRow = columnDivs.map(div => div);

  // 3. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // 4. Replace the original element with the new table
  element.replaceWith(table);
}

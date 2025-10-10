/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must match block name exactly, as a single string in an array
  const headerRow = ['Table (bordered, tableBordered18)'];

  // Find all direct children divs with class 'divider' (each is a Q&A row)
  const qaDivs = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: If not found, try to find all dividers inside (sometimes the wrapper class is on the parent)
  const rows = qaDivs.length > 0 ? qaDivs : Array.from(element.querySelectorAll('.divider'));

  // Build table rows: each divider contains a grid with two children (question and answer)
  const tableRows = rows.map(divider => {
    // Find the grid inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return [divider.cloneNode(true), '']; // fallback: put the whole divider in one cell
    const cells = Array.from(grid.children);
    // Defensive: expect two children (question, answer)
    if (cells.length >= 2) {
      return [cells[0], cells[1]];
    }
    // fallback: just put whatever is there
    return cells;
  });

  // Compose the full table data
  const tableData = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

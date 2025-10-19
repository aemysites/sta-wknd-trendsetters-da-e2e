/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Table (striped, bordered, tableStripedBordered18)'];

  // Find all direct children that are dividers (each Q&A pair)
  const dividerDivs = element.querySelectorAll(':scope > .divider');

  // Defensive: fallback if not found (sometimes the first is wrapped deeper)
  let qnaDivs = dividerDivs;
  if (!dividerDivs.length) {
    qnaDivs = element.querySelectorAll(':scope > div > .divider');
  }

  // Build table rows: each divider contains a grid with two children (Q & A)
  const rows = [];
  qnaDivs.forEach(divider => {
    // Find the grid inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // The first child is the question (heading), second is the answer (rich text)
    const cells = grid.querySelectorAll(':scope > div');
    if (cells.length < 2) return;
    const question = cells[0];
    const answer = cells[1];
    rows.push([question, answer]);
  });

  // If no divider children, fallback to direct grid children (defensive)
  if (!rows.length) {
    const grids = element.querySelectorAll('.w-layout-grid');
    grids.forEach(grid => {
      const cells = grid.querySelectorAll(':scope > div');
      if (cells.length < 2) return;
      rows.push([cells[0], cells[1]]);
    });
  }

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix: set colspan=2 on the header cell to visually span both columns
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }

  // Replace the original element
  element.replaceWith(table);
}

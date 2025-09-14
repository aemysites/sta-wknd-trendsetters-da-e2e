/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as per instructions
  const headerRow = ['Table (no header, tableNoHeader13)'];

  // Each FAQ is a .divider direct child of the main element
  const rows = [];
  // Defensive: get all direct children with class 'divider'
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Each divider contains a .w-layout-grid
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // Defensive
    // The first child is the question, the second is the answer
    const children = Array.from(grid.children);
    if (children.length < 2) return; // Defensive
    const question = children[0];
    const answer = children[1];
    // Place each in its own cell
    rows.push([question, answer]);
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}

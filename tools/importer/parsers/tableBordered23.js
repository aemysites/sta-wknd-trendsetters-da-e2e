/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must be a single cell with the block name (no object, no colspan)
  const headerRow = ['Table (bordered, tableBordered23)'];

  // Each FAQ item is a .divider > .w-layout-grid
  // Each grid has: first child = question (h4-heading), second child = answer (rich-text)
  const rows = [];
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // Defensive: skip if grid not found
    const children = grid.children;
    if (children.length < 2) return; // Defensive: skip if not enough children
    const question = children[0]; // h4-heading
    const answer = children[1];   // rich-text
    rows.push([question, answer]);
  });

  // Compose the table: header + all rows
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(table);
}

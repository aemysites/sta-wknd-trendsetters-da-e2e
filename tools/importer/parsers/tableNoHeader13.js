/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Table (no header, tableNoHeader13)'];
  const rows = [headerRow];

  // Get all immediate children with class 'divider' (each is a Q&A row)
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach(divider => {
    // Each divider contains a grid-layout with two children: question and answer
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // Defensive: skip if structure is missing
    const children = grid.querySelectorAll(':scope > div');
    if (children.length < 2) return; // Defensive: skip if not enough columns
    const question = children[0];
    const answer = children[1];
    rows.push([question, answer]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

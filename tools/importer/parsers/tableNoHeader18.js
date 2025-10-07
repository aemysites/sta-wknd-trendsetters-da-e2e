/* global WebImporter */
export default function parse(element, { document }) {
  // Table (no header, tableNoHeader18) block
  // The block consists of a single header row (single cell), then 4 rows, each with 2 columns: question (left), answer (right)

  // Get all immediate child dividers (each represents a row)
  const rows = Array.from(element.querySelectorAll(':scope > .divider'));

  // Build the table rows
  const cells = [];

  // Header row (single cell)
  cells.push(['Table (no header, tableNoHeader18)']);

  rows.forEach(divider => {
    // Each divider contains a grid-layout div with two children: question (heading), answer (rich-text)
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if grid not found
    const children = Array.from(grid.children);
    // Defensive: expect 2 children (question, answer)
    if (children.length < 2) return;
    // Each row should have two columns: question and answer
    cells.push([children[0], children[1]]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table (no header, tableNoHeader18) block
  const headerRow = ['Table (no header, tableNoHeader18)'];
  const rows = [headerRow];

  // Find all direct children with class 'divider' (each is a Q&A row)
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach(divider => {
    // Each divider contains a grid with two children: question and answer
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const gridChildren = grid.children;
    if (gridChildren.length < 2) return;
    const question = gridChildren[0];
    const answer = gridChildren[1];
    // Each row should be two columns: question and answer
    rows.push([question, answer]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

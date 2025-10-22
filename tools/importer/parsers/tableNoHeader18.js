/* global WebImporter */
export default function parse(element, { document }) {
  // Table (no header, tableNoHeader18) block
  // First row: single cell with block name, then each Q&A as two-column row

  // Find all divider blocks (each is a Q&A pair)
  const qaDividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Build rows: each row is [question, answer]
  const rows = qaDividers.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['']; // Defensive fallback
    const children = Array.from(grid.children);
    const question = children[0] || document.createElement('div');
    const answer = children[1] || document.createElement('div');
    return [question, answer];
  });

  // Header row: exactly one column with block name
  const headerRow = ['Table (no header, tableNoHeader18)'];
  const tableCells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element
  element.replaceWith(block);
}

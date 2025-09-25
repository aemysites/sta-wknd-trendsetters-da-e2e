/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Table (no header, tableNoHeader18)'];

  // Collect all immediate child divs with class 'divider' (each is a Q&A row)
  const dividerDivs = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: if no divider divs found, try fallback to all immediate children
  const rows = dividerDivs.length ? dividerDivs : Array.from(element.children);

  // Build table rows: each row is [question, answer]
  const tableRows = rows.map(divider => {
    // Find grid container within divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['']; // Defensive: blank row if missing
    // Get immediate children of grid: first is question, second is answer
    const gridChildren = Array.from(grid.children);
    // Defensive: ensure at least two children
    const question = gridChildren[0] || document.createElement('div');
    const answer = gridChildren[1] || document.createElement('div');
    return [question, answer];
  });

  // Compose final cells array
  const cells = [headerRow, ...tableRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}

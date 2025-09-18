/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate child dividers (each represents a row)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Build the header row
  const headerRow = ['Table (no header, tableNoHeader13)'];
  const rows = [headerRow];

  // For each divider, extract the question and answer
  dividers.forEach(divider => {
    // Each divider contains a grid-layout
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if grid missing
    // Get immediate children of grid
    const cells = Array.from(grid.children);
    // Defensive: expect two children: question and answer
    if (cells.length < 2) return;
    const question = cells[0]; // h4-heading
    const answer = cells[1];   // rich-text
    // Place both in the row
    rows.push([question, answer]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}

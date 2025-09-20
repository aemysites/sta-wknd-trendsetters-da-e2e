/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Table (bordered, tableBordered18)'];

  // Collect all immediate child dividers (each is a Q&A row)
  const rows = [];
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // Each divider contains a grid-layout div
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if not found
    const cells = grid.querySelectorAll(':scope > div');
    // Defensive: expect two cells per row (question and answer)
    if (cells.length >= 2) {
      rows.push([
        cells[0], // Question (heading)
        cells[1], // Answer (paragraph)
      ]);
    }
  });

  // Build the table data array
  const tableData = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}

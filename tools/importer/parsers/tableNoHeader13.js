/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate children with class 'divider'
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  const rows = [];

  // Table header row
  const headerRow = ['Table (no header, tableNoHeader13)'];
  rows.push(headerRow);

  // For each divider, extract the two columns: question and answer
  dividers.forEach(divider => {
    // Each divider contains a grid-layout with two children
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if grid not found
    const children = Array.from(grid.children);
    // Defensive: Expecting two children per grid
    if (children.length < 2) return;
    const question = children[0]; // h4-heading
    const answer = children[1];   // rich-text paragraph-lg
    // Add row with both elements
    rows.push([question, answer]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with table
  element.replaceWith(table);
}

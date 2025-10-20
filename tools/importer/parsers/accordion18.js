/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion18) block table construction
  // Header row must be single cell, but table must have two columns for data rows
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Each .divider is an accordion item
  const itemDividers = element.querySelectorAll(':scope > .divider');

  itemDividers.forEach(divider => {
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    const children = grid.children;
    if (children.length < 2) return;
    // Each row: [title, content]
    rows.push([children[0], children[1]]);
  });

  // Create table with two columns for data rows, header row is single cell
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix header row to span two columns
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }
  // Replace original element
  element.replaceWith(table);
}

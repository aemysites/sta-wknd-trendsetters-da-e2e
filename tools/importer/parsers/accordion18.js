/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion18) block: 2 columns, multiple rows
  // Each row: [Title, Content]
  // Header row: block name only, must be a single cell

  // Helper: Get all immediate children divs that are accordion items
  const itemDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare rows
  const rows = [];
  // Header row as required: single cell
  rows.push(['Accordion (accordion18)']);

  // Each accordion item is a .divider containing a grid-layout with two children:
  // [0] Title (h4-heading), [1] Content (rich-text)
  itemDivs.forEach(divider => {
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    const title = grid.querySelector('.h4-heading');
    const content = grid.querySelector('.rich-text');
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix header row to span two columns
  const headerRow = table.querySelector('tr');
  if (headerRow && headerRow.children.length === 1) {
    headerRow.children[0].setAttribute('colspan', '2');
  }

  // Replace original element
  element.replaceWith(table);
}

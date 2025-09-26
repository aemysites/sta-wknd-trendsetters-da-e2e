/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion items
  // Each accordion item is a .divider containing a .grid-layout with two children: title and content
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Defensive: get all immediate children with class 'divider'
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Each divider contains a .grid-layout
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    // The grid has two children: title and content
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    const title = children[0];
    const content = children[1];
    rows.push([title, content]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

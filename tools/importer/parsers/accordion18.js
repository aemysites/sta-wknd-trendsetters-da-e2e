/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Defensive: get all direct children that are dividers (each accordion item)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));

  accordionItems.forEach((divider) => {
    // Each divider contains a grid-layout div with two children: title and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // skip if structure is off
    const children = Array.from(grid.children);
    // Defensive: expect at least 2 children: [title, content]
    if (children.length < 2) return;
    const title = children[0];
    const content = children[1];
    // Push as a row: [title, content]
    rows.push([title, content]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Each accordion item is a .divider > .w-layout-grid
  // Defensive: get all direct children with class 'divider'
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach((divider) => {
    // Each divider contains a .w-layout-grid
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // The first child is the title, the second is the content
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    const title = children[0];
    const content = children[1];
    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
